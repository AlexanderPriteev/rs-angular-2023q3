import { CommonModule } from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';

import { IColumn } from '../../interfaces/groups';
import {GroupCardComponent} from "../group-card/group-card.component";
import {IItem} from "../../interfaces/items";

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    CommonModule, GroupCardComponent
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent implements OnInit{
  @Input() columnItem: IColumn = {} as IColumn;
  isShowModal: boolean = false;
  items: IItem[] = []

  ngOnInit() {
    this.items = this.columnItem.items.map((e): IItem => ({type: this.columnItem.type, item: e}))
  }

  toggleModal() {
    this.isShowModal = !this.isShowModal;
  }
}
