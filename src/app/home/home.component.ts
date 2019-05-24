import { User } from './../models/user';
import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { SocketService } from '../shared/services/socket.services';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from "moment-timezone";
import { GroupComponent } from './group/group.component';
import { MessageFlashService } from '../shared/services/message-flash.service';
import { Group } from '../models/group';
moment.tz.setDefault('Asia/Ho_Chi_Minh');
const dateFormat = "HH:mm:ss | DD-MM-YYYY";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  entryComponents: [GroupComponent],
})
export class HomeComponent implements OnInit {
  user: User;
  members: Array<User> = [];
  document: any = {
    type: 'text',
    body: '',
  };
  histories: any = [];
  room: any = {
    name: '',
    avatar: '',
  };

  @ViewChild('scrollMe') item: ElementRef;
  scrollMess: number = null;

  typing: string;
  typingTimeout: any;
  typingBreak: boolean = false;

  @ViewChild('group') groupCtrl: GroupComponent;

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private userService: UserService,
    private socketService: SocketService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageFlashService,
  ) {

  }

  ngOnInit() {
    //nhan trang thai dang typing message
    this.socketService.get('server_send_typing_status').subscribe((name: string) => {
      if (!this.typingBreak) {
        this.typingBreak = true;
        this.typing = name + ' đang nhập...';
        this.typingTimeout = setTimeout(() => {
          this.typingBreak = false;
          this.typing = '';
        }, 5000);
      }
    });

    //lay du lieu user
    this.socketService.get('server_send_get_user_data').subscribe(() => {
      this.activatedRoute.data.subscribe((data) => {
        this.user = data.UserResolver;
        this.user.avatar = this.user.avatar || '/assets/img/avatar.png';
        this.socketService.send('client_send_user_info', this.user);
      });
    });

    //nhan danh sach lich su tai lieu
    this.socketService.get('server_send_history_documents').subscribe((documents: any) => {
      documents = _.map(documents, e => {
        e.time = moment().format(dateFormat);
        if (e.user.id == this.user.id) e.me = true; return e;
      });
      this.histories = documents;
    });

    //nhan va gui tin nhan den client
    this.socketService.get('server_send_document_this_client').subscribe((document: any) => {
      document.time = moment().format(dateFormat);
      document.me = true;
      this.histories.push(document);
      this.onScroll();
    });

    //nhan va gui tin nhan den client khac
    this.socketService.get('server_send_document_other_client').subscribe((document: any) => {
      document.time = moment().format(dateFormat);
      this.histories.push(document);
      this.clearTypingStatus();
      this.onScroll();
    });

    //nhan danh sanh members
    this.socketService.get('server_send_members_list').subscribe((data: User[]) => {
      _.remove(data, (e: User) => e.id == this.user.id);
      _.orderBy(data, ['online'], ['desc']);
      this.members = data;
    });

    //nhan thong bao co user moi online
    this.socketService.get('server_send_user_status').subscribe((data: User) => {
      this.messageService.flashInfo(`${data.name} vừa online`);
    });

  }

  onCreateGroup() {
    this.groupCtrl.create();
  }

  onTyping(e: any) {
    this.socketService.send('client_send_typing_status');
    const el = document.getElementById('write_msg');
  }

  clearTypingStatus() {
    this.typing = '';
    this.typingBreak = false;
    clearTimeout(this.typingTimeout);

  }

  onSendMsg(e: any) {
    this.document.body = this.document.body.trim();
    if (!this.document.body.length) {
      return;
    }
    this.socketService.send('client_send_document', this.document).subscribe(res => {
      this.document.body = '';
    });
  }

  onScroll() {
    this.scrollMess = this.item.nativeElement.scrollHeight;
  }

  logout() {
    this.userService.logout();
  }

}
