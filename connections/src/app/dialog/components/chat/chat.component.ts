import {Component, Input, OnChanges} from '@angular/core';

import { MessageComponent } from '../message/message.component';
import {IMessage} from "../../../redux/interfaces/message";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MessageComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnChanges {
  @Input() dialog: IMessage[] = [];



  ngOnChanges() {
    console.log(this.dialog)
  }

}
