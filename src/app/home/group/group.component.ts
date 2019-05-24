import { User } from './../../models/user';
import { CreateGroupComponent } from './modal/create-group.component';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/shared/services/group.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageFlashService } from 'src/app/shared/services/message-flash.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.sass']
})
export class GroupComponent implements OnInit {
  groups: Group[];
  user: User;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private messageService: MessageFlashService,
    private modalService: BsModalService,
  ) {
    router.events.subscribe((val) => console.log(val instanceof NavigationEnd))
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.user = data.UserResolver;
      this.list();
    });
  }

  onSelectGroup(group) {
    console.log(group)
  }

  list() {
    this.groupService.list(this.user.id).subscribe(res => {
      this.groups = _.orderBy(res, ['_id'], ['desc']);
    }, err => {
      this.messageService.flashError(err);
    });
  }

  create() {
    const title = "Tạo nhóm";
    const button = "Tạo";
    this.showContentModal(title, null, button);
  }

  showContentModal(title: string, body: string, button: string) {
    const modal = this.modalService.show(CreateGroupComponent);
    (<CreateGroupComponent>modal.content).showModal(title, body, button);
    (<CreateGroupComponent>modal.content).onClose.subscribe((res: Group) => {
      if (res) {
        this.groups.unshift(res);
      }
    });
  }

}
