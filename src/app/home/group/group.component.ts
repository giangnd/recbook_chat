import { AddMemberComponent } from './modal/add-member.component';
import { User } from './../../models/user';
import { CreateGroupComponent } from './modal/create-group.component';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/shared/services/group.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageFlashService } from 'src/app/shared/services/message-flash.service';
import * as _ from 'lodash';
import { SocketService } from 'src/app/shared/services/socket.services';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.sass']
})
export class GroupComponent implements OnInit {
  groups: Group[];
  user: User;
  room: any = {
    _id: '00000',
    id: '00000',
    name: 'Cộng đồng RECBOOK',
    avatar: '',
    members: [],
  };


  myGroup: boolean = false;

  @Output() messageRoomEvent = new EventEmitter<any>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private messageService: MessageFlashService,
    private modalService: BsModalService,
    private socketService: SocketService,
  ) {
    router.events.subscribe((val) => console.log(val instanceof NavigationEnd))
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.user = data.UserResolver;

      console.log('get toan bo room hien co cho user:' + this.user.id);
      this.getMyGroups();
    });
  }

  getMyGroups() {
    this.groupService.list(this.user.id).subscribe(res => {
      this.groups = _.orderBy(res, ['_id'], ['desc']);
      this.groups.unshift(this.room);
    }, err => {
      this.messageService.flashError(err);
    });
  }

  addUserToGroup() {
    const modal = this.modalService.show(AddMemberComponent);
    (<AddMemberComponent>modal.content).showModal(`Thêm thành viên vào nhóm ${this.room.name}`, this.room, "Thêm");
    (<AddMemberComponent>modal.content).onClose.subscribe((member) => {
      if (member) {
        console.log(member);
      }
    });
  }

  joinGroup(group) {
    if (group._id === this.room.id) {
      return;
    }
    this.room.id = group._id;
    this.room.name = group.name;

    if (group.user_id == this.user.id) {
      this.myGroup = true;
    }

    this.messageRoomEvent.emit(
      {
        room: this.room,
        myRoom: this.myGroup,
      }
    );

    this.socketService.send('client_send_join_a_room', this.room);
  }

  createGroup() {
    const title = "Tạo nhóm";
    this.showContentModal(title, null, title);
  }

  showContentModal(title: string, body: string, button: string) {
    const modal = this.modalService.show(CreateGroupComponent);
    (<CreateGroupComponent>modal.content).showModal(title, body, button);
    (<CreateGroupComponent>modal.content).onClose.subscribe((group: Group) => {
      if (group) {
        this.joinGroup(group);
        this.groups.unshift(group);
      }
    });
  }
}
