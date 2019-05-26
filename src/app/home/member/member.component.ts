import { MessageFlashService } from 'src/app/shared/services/message-flash.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { SocketService } from 'src/app/shared/services/socket.services';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.sass']
})
export class MemberComponent implements OnInit {
  user: User;
  members: Array<User> = [];
  allUsers: Array<User> = [];
  room: any;

  constructor(
    private socketService: SocketService,
    private groupService: GroupService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageFlashService,
  ) { }

  ngOnInit() {

    this.activatedRoute.data.subscribe((data) => {
      this.user = data.UserResolver;
    });

    //get danh sach users dang online
    this.socketService.get('server_send_members_online').subscribe((data: User[]) => {
      this.members = _.orderBy(data, ['id'], ['desc']);
      this.members = _.remove(this.members, e => e.id !== this.user.id);
    });

    //nhan thong bao co user moi online
    this.socketService.get('server_send_user_status').subscribe((data: User) => {
      const name = data.name || 'Ai đó';
      this.messageService.flashInfo(`${name} vừa online`);
      this.members.push(data);
      this.members = _.orderBy(this.members, ['id'], ['desc']);
    });

    //xoa user khoi danh sach
    this.socketService.get('server_send_remove_me').subscribe((data) => {
      const name = data.name || 'Ai đó';
      this.messageService.flashWarning(`${name} vừa thoát`);
      this.members = _.remove(this.members, e => e.id !== data.id);
    });
  }

  getMembersInGroup(room) {
    this.room = room;
    console.log('Get cac thanh vien trong room: ' + room.name);
    this.groupService.getMembers(room.id).subscribe(res => {
      console.log(res);
      this.members = res;
    });
  }

  chatWithMe(user_id) {

  }

}
