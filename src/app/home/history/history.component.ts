import { MessageFlashService } from 'src/app/shared/services/message-flash.service';
import { Component, OnInit } from '@angular/core';
import { History } from 'src/app/models/history';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {
  histories: History[];

  constructor(
    private messageService: MessageFlashService,
  ) { }

  ngOnInit() {

  }

}
