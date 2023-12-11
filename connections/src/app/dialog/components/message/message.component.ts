import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';
import { IMessage } from '../../../redux/interfaces/message';
import { parseDateByStamp } from '../../../shared/functions/parseDateByStamp';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit {
  @Input() message!: IMessage;
  name: string = '';
  date: string = '';
  isMe: boolean = false;

  constructor(
    private auth: AuthService,

  ) {
  }

  ngOnInit() {
    this.date = parseDateByStamp(this.message.createdAt.S);
    this.name = this.message?.authorName || this.message.authorID.S;
    this.isMe = this.auth.getUid() === this.message.authorID.S;
  }
}
