import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

import { IGroupItem, IItem, IPeopleItem } from '../../../redux/interfaces/items';
import {Store} from "@ngrx/store";
import {AppState} from "../../../redux/interfaces/state";
import {take} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";
import {QueriesService} from "../../../api/services/queries.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {IPeople} from "../../../redux/interfaces/groups";
import {AlertsService} from "../../../shared/services/alerts.service";
import {deleteGroup} from "../../../redux/actions/groups.action";
import {selectGroups} from "../../../redux/selectors/groups.selector";

@Component({
  selector: 'app-group-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.scss'
})
export class GroupCardComponent implements OnInit {
  @Input() item: IItem = {} as IItem;
  @Output() onChange = new EventEmitter<boolean>()

  isMe: boolean = false;
  isDialog: boolean = false;
  isModal: boolean = false;
  isSend: boolean = false;

  constructor( private store: Store<AppState>,
               private auth: AuthService,
               private query: QueriesService,
               private alertService: AlertsService) {
  }

  toggleModal(){
    this.isModal = !this.isModal;
  }

  deleteItem(){
    const groupID = (this.item.item as IGroupItem).id.S;
    const groupName = this.item.item.name.S;
    this.isSend = true;
    this.query.deleteGroup(groupID).subscribe(
      () => {
        this.store.dispatch(deleteGroup({groupID: groupID}));
        const message = `${groupName} group removed`;
        this.alertService.updateAlert({ message, type: 'success', isShow: true });
        this.onChange.emit(true);
      },
      (error) => {
        const message = error.error?.message || `Failed to remove ${groupName} group`;
        this.alertService.updateAlert({ message, type: 'error', isShow: true });
        this.isSend = false;
      }
    )
  }

  ngOnInit() {
    if(this.item.type === 'group'){
      this.isMe = (this.item.item as IGroupItem).createdBy?.S === this.auth.getUid();
    } else {
      this.isDialog = (this.item.item as IPeopleItem).name?.S === 'me';
    }
  }

}
