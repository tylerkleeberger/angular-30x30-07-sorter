import { Component } from '@angular/core';
import { MessageService } from './service.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {

  constructor(public messageService: MessageService) { }

}
