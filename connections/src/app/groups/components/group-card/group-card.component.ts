import { CommonModule } from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';

import {IGroupItem, IItem, IPeopleItem} from '../../interfaces/items';

@Component({
  selector: 'app-group-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.scss'
})
export class GroupCardComponent implements OnInit{
  @Input() item: IItem = {} as IItem;
  isMe: boolean = false;
  isDialog: boolean = false;

  ngOnInit() {
    this.isMe = this.item.type === 'group' && (this.item.item as IGroupItem).name?.S === 'me';
    this.isDialog= this.item.type === 'people' && (this.item.item as IPeopleItem).companionID?.S === 'me';
  }
}
