import { AddMemberComponent } from './modal/add-member.component';
import { User } from './../../models/user';
import { CreateGroupComponent } from './modal/create-group.component';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/shared/services/group.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageFlashService } from 'src/app/shared/services/message-flash.service';
import * as _ from 'lodash';
import { SocketService } from 'src/app/shared/services/socket.services';
import { DocumentService } from 'src/app/shared/services/document.service';

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

  @ViewChild('scrollMe') item: ElementRef;
  scrollMess: number = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private messageService: MessageFlashService,
    private modalService: BsModalService,
    private socketService: SocketService,
    private documentService: DocumentService,
  ) {
    // router.events.subscribe((val) => console.log(val instanceof NavigationEnd));
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.user = data.UserResolver;
      this.getMyGroups(this.user.id);
    });

    //them room moi vao danh sach neu toi da accept vao room do
    this.socketService.get('server_send_join_new_room').subscribe((data) => {
      if (_.find(data.users, e => e == this.user.id) && this.user.id != data.user_id) {
        this.messageService.flashInfo(`Nhóm mới: ${data.group.name}`);
        this.groups.unshift(data.group);
        this.onScroll();
        // this.onClickJoinRoom(data.group);

        //update list members
      }
    });

    //khi roi room toi phai thong bao cho mng trong room do biet
    this.socketService.get('server_send_leave_a_room').subscribe((data) => {
      if (_.find(data.remainUsers, e => e == this.user.id)) {
        _.map(this.groups, e => {
          if (e.id == data.room_id) e.members = data.remainUsers;
          return e;
        });

        //update list members
      }
    });
  }

  getMyGroups(userId: number) {
    this.groupService.list(userId).subscribe(res => {
      this.groups = _.orderBy(res, ['_id'], ['desc']);
    }, err => {
      this.messageService.flashError(err);
    });
  }

  addUserToGroup() {
    const modal = this.modalService.show(AddMemberComponent);
    (<AddMemberComponent>modal.content).showModal(this.user, `Nhóm ${this.room.name}`, this.room, "Thêm");
    (<AddMemberComponent>modal.content).onClose.subscribe((member) => {
      if (member) {
        // console.log(member);
      }
    });
  }

  onClickJoinRoom(group) {
    if (group._id === this.room.id) {
      return;
    }
    this.room = group;
    this.room.id = group._id;

    if (group.user_id == this.user.id) {
      this.myGroup = true;
    } else {
      this.myGroup = false;
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

  leaveGroup() {
    const remainUsers = _.remove(this.room.members, e => e !== this.user.id);
    this.groupService.update(this.room.id, { members: remainUsers }).subscribe((res) => {
      this.groups = _.remove(this.groups, e => e.id !== this.room.id);

      const document = {
        user_id: this.user.id,
        room_id: this.room.id,
        type: 'sts',
        body: `${this.user.name} đã rời nhóm`,
      };

      this.socketService.send('client_send_document', document).subscribe((res) => {
        //save trang thai roi nhom
        this.documentService.create(document).subscribe((res) => {
          console.log(res);
        });
      });

      //roi khoi room tren server
      this.socketService.send('client_send_leave_a_room', {
        username: this.user.name,
        room_id: this.room.id,
        remainUsers: remainUsers,
      });

    });
  }

  showContentModal(title: string, body: string, button: string) {
    const modal = this.modalService.show(CreateGroupComponent);
    (<CreateGroupComponent>modal.content).showModal(title, body, button);
    (<CreateGroupComponent>modal.content).onClose.subscribe((group: Group) => {
      if (group) {
        this.onClickJoinRoom(group);
        this.groups.unshift(group);
      }
    });
  }

  onScroll() {
    this.scrollMess = this.item.nativeElement.offsetTop;
  }
}
