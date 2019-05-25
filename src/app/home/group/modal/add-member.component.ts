import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MessageFlashService } from '../../../shared/services/message-flash.service';
import { TokenService } from '../../../shared/services/token.service';
import { GroupService, Group } from '../../../shared/services/group.service';

import * as _ from 'lodash';

@Component({
    selector: 'app-add-member',
    templateUrl: './add-member.component.html',
})

export class AddMemberComponent implements OnInit {
    title: string;
    button: string;
    onClose: Subject<any>;

    @Input() group: any = {
        members: [],
    };
    newMembers: any;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private modalRef: BsModalRef,
        private messageService: MessageFlashService,
        private tokenService: TokenService,
        private groupService: GroupService,
    ) { }

    ngOnInit() {
        this.onClose = new Subject();
    }

    showModal(title: string, body: any, button: string): void {
        this.title = title;
        this.group = body ? body : this.group;
        this.button = button;

        console.log(this.group);
    }

    onSubmit() {
        if (!this.canSubmit())
            return;

        const userId = this.tokenService.getUserId();
        this.group.user_id = Number(userId);
        const obversable = this.groupService.update(this.group['_id'], this.group);
        obversable.subscribe(res => {
            this.onClose.next(res);
            this.close();
        }, err => {
            this.messageService.flashError(err || err.mesage);
        });
    }

    canSubmit() {
        return this.group.name;
    }

    close(): void {
        this.onClose.next(false);
        this.modalRef.hide();
    }
}
