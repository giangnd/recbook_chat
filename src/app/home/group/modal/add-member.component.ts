import { SocketService } from './../../../shared/services/socket.services';
import { User } from './../../../models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MessageFlashService } from '../../../shared/services/message-flash.service';
import { TokenService } from '../../../shared/services/token.service';
import { GroupService, Group } from '../../../shared/services/group.service';

import * as _ from 'lodash';
import { DocumentService } from 'src/app/shared/services/document.service';

@Component({
    selector: 'app-add-member',
    templateUrl: './add-member.component.html',
})

export class AddMemberComponent implements OnInit {
    user: User;
    title: string;
    button: string;
    onClose: Subject<any>;

    @Input() group: any = {
        members: [],
    };
    mainUsers: User[] = [];
    allUsers: User[] = [];
    loadUsers: User[] = [];
    selectedUsers: any = [];
    inputTxt: any;
    openLoading: boolean = true;
    onAll: boolean = true;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private modalRef: BsModalRef,
        private messageService: MessageFlashService,
        private tokenService: TokenService,
        private groupService: GroupService,
        private userService: UserService,
        private socketService: SocketService,
        private documentService: DocumentService,
    ) { }

    ngOnInit() {
        this.onClose = new Subject();
        if (!this.loadUsers.length) {
            this.onAll = false;
        }
    }

    onMouseDown() {

        this.openLoading = true;
        this.loadUsers = this.allUsers;

    }

    mouseover() {
        this.openLoading = false;
    }

    findingUser() {
        this.openLoading = true;
        this.loadUsers = [];
        if (this.inputTxt) {
            this.inputTxt = this.inputTxt.toLowerCase();
            this.loadUsers = _.filter(this.allUsers, e => {
                e.name = e.name.toLowerCase()
                return e.name.indexOf(this.inputTxt) != -1;
            });
        }
    }

    selectUser(user: any) {
        this.inputTxt = '';
        this.openLoading = false;
        this.selectedUsers.push(user);
        this.allUsers = _.remove(this.allUsers, e => e.userId !== user.userId);
        if (this.selectedUsers.length == this.mainUsers.length) {
            this.onAll = false;
        }
    }

    selectAllUsers() {
        this.openLoading = false;
        this.loadUsers = this.mainUsers;
        this.selectedUsers = this.mainUsers;
        this.onAll = false;
    }

    removeSelected(user: any) {
        this.openLoading = false;
        this.selectedUsers = _.remove(this.selectedUsers, e => e.userId !== user.userId);
        this.allUsers.push(user);
    }

    showModal(user: any, title: string, body: any, button: string): void {
        this.title = title;
        this.group = body ? body : this.group;
        this.button = button;

        this.user = user;
        this.userService.invite(this.group.id, this.group.members).subscribe((res) => {
            this.allUsers = res;
            this.mainUsers = res;
        });
    }

    onSubmit() {
        if (!this.canSubmit())
            return;

        _.forEach(this.selectedUsers, e => {
            //send mail to e.userId then save
            //....

            this.group.members.push(e.userId);
        });

        const obversable = this.groupService.update(this.group.id, { members: this.group.members });
        obversable.subscribe(res => {
            //da dc vao room moi
            this.onClose.next(res);
            this.close();
            this.sendNewGroupToNewMembers();
        }, err => {
            this.messageService.flashError(err || err.mesage);
        });
    }

    sendNewGroupToNewMembers() {
        this.socketService.send('client_send_join_new_room', {
            user_id: this.user.id,
            users: this.group.members,
            group: { _id: this.group._id, name: this.group.name, members: this.group.members, time: this.group.time }
        });

    }

    canSubmit() {
        return this.group.members.length;
    }

    close(): void {
        this.onClose.next(false);
        this.modalRef.hide();
    }
}
