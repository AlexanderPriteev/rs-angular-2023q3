import { Component } from '@angular/core';
import {DialogHeadlineComponent} from "../components/headline/headline.component";
import {ChatComponent} from "../components/chat/chat.component";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    DialogHeadlineComponent,
    ChatComponent
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

}
