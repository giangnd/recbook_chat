import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MessageFlashService } from '../../../shared/services/message-flash.service';
import { TokenService } from '../../../shared/services/token.service';
import { GroupService, Group } from '../../../shared/services/group.service';

import * as _ from 'lodash';

@Component({
    selector: 'app-create-group',
    templateUrl: './create-group.component.html',
})

export class CreateGroupComponent implements OnInit {
    title: string;
    button: string;
    onClose: Subject<any>;

    @Input() group: Group = {
        name: '',
        user_id: 0,
        time: '',
    };

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
    }

    onSubmit() {
        if (!this.canSubmit())
            return;

        const userId = this.tokenService.getUserId();
        this.group.user_id = Number(userId);

        const obversable = this.group && this.group['_id'] ?
            this.groupService.update(this.group['_id'], this.group) :
            this.groupService.create(this.group);

        obversable.subscribe(res => {
            this.messageService.flashSuccess(`${this.button} ${this.group.name} thành công!`);
            this.onClose.next(res);
            this.close();
        }, err => {
            this.messageService.flashError(err);
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
