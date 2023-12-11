import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IMessage } from '../../../redux/interfaces/message';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MessageComponent, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  @Input() dialog: IMessage[] = [];
  @Output() newMessage = new EventEmitter<string>();
  newMessageField: string = '';
  sendMessage() {
    this.newMessage.emit(this.newMessageField);
    this.newMessageField = '';
  }
}
