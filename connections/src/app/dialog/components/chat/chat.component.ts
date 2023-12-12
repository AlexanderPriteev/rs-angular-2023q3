import { CommonModule } from '@angular/common';
import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IMessage } from '../../../redux/interfaces/message';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MessageComponent, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  @Input() dialog: IMessage[] = [];
  @Input() timer: number = 0;
  @Input() dialogName: string = '';
  @Output() newMessage = new EventEmitter<string>();
  @Output() dataUpdate = new EventEmitter<boolean>();
  newMessageField: string = '';
  type: string = '';

  constructor(private route: ActivatedRoute) {
  }

  sendMessage() {
    this.newMessage.emit(this.newMessageField);
    this.newMessageField = '';
  }

  update() {
    this.timer = -1;
    this.dataUpdate.emit(true);
  }
  ngOnInit() {
    [this.type] = this.route.snapshot.url.map((e) => e.path);
  }
}
