import { User } from './../models/user';
import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Compiler } from '@angular/core';
import { SocketService } from '../shared/services/socket.services';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from "moment-timezone";
import { GroupComponent } from './group/group.component';
import { MessageFlashService } from '../shared/services/message-flash.service';
import { DocumentService } from '../shared/services/document.service';
import { MemberComponent } from './member/member.component';
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

  document: any = {
    type: 'text',
    body: '',
  };
  documents: any = [];

  room: any = {
    id: '',
    name: '',
    avatar: '',
  };

  @ViewChild('scrollMe') item: ElementRef;
  scrollMess: number = null;

  typing: string;
  typingTimeout: any;
  typingBreak: boolean = false;
  typingEnabled: boolean = false;

  myGroup: boolean = false;
  allowLeaveRoom: boolean = false;

  @ViewChild('groupCtrl') groupCtrl: GroupComponent;
  @ViewChild('memberCtrl') memberCtrl: MemberComponent;

  constructor(
    private compiler: Compiler,
    private router: Router,
    private activedRouter: ActivatedRoute,
    private userService: UserService,
    private socketService: SocketService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageFlashService,
    private documentService: DocumentService,
  ) {

  }

  ngOnInit() {
    this.compiler.clearCache();

    this.activatedRoute.data.subscribe((data) => {
      this.user = data.UserResolver;
      this.socketService.send('client_send_user_info', this.user);
      this.socketService.send('client_send_room_info');
    });

    //thong tin room hien tai
    this.socketService.get('server_send_room_info').subscribe((room) => {
      this.room = room;
      // this.onGetDocumentsInRoom();
    });

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

    //nhan danh sach lich su tai lieu
    // this.socketService.get('server_send_history_documents').subscribe((documents: any) => {
    //   documents = _.map(documents, e => {
    //     e.time = moment().format(dateFormat);
    //     if (e.user.id == this.user.id) e.me = true; return e;
    //   });
    //   this.documents = documents;
    // });

    //nhan va gui tin nhan den client
    this.socketService.get('server_send_document_this_client').subscribe((document: any) => {
      document.time = moment().format(dateFormat);
      document.me = true;
      this.documents.push(document);
      this.onScroll();
    });

    //nhan va gui tin nhan den client khac
    this.socketService.get('server_send_document_other_client').subscribe((document: any) => {
      document.time = moment().format(dateFormat);
      this.documents.push(document);
      this.clearTypingStatus();
      this.onScroll();
    });

    this.socketService.get('server_send_existed_user').subscribe(() => {
      this.userService.logout();
      this.messageService.flashWarning('Bạn đang đăng nhập trên 1 thiết khác. Vui lòng thử lại sau.');
    });

  }

  receiveGroup(event: any) {
    this.myGroup = event.myRoom;
    this.room = event.room;
    this.allowLeaveRoom = true;

    this.onGetDocumentsInRoom();

    // this.memberCtrl.getMembersInGroup(event);
  }

  onLeaveGroup() {
    this.groupCtrl.leaveGroup();
    this.documents = [];
    this.typingEnabled = false;
  }

  onGetDocumentsInRoom() {
    this.documents = [];
    this.documentService.list(this.user.id, this.room.id).subscribe((data) => {
      this.documents = data;
      this.typingEnabled = true;
    });
  }

  onCreateGroup() {
    this.groupCtrl.createGroup();
  }

  addMoreMember() {
    this.groupCtrl.addUserToGroup();
  }

  onTyping(e: any) {
    this.socketService.send('client_send_typing_status');
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
      this.document.user_id = this.user.id;
      this.document.room_id = this.room.id;

      this.documentService.create(this.document).subscribe((res) => {
        this.document.body = '';
      });


    });
  }

  onScroll() {
    this.scrollMess = this.item.nativeElement.scrollHeight;
  }

  logout() {
    this.socketService.send('client_logout');
    this.userService.logout();
  }

}
