import { CommonModule } from '@angular/common';
import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { QueriesService } from '../../../api/services/queries.service';
import { AuthService } from '../../../auth/services/auth.service';
import { deleteGroup } from '../../../redux/actions/groups.action';
import { addConversationPeople } from '../../../redux/actions/people.action';
import { IGroupItem, IItem, IPeopleItem } from '../../../redux/interfaces/items';
import { AppState } from '../../../redux/interfaces/state';
import { AlertsService } from '../../../shared/services/alerts.service';

export type TRoutDialog = '/conversation' | '/group';

@Component({
  selector: 'app-group-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.scss'
})
export class GroupCardComponent implements OnInit {
  @Input() item: IItem = {} as IItem;
  @Output() targetDelete = new EventEmitter<boolean>();

  isMe: boolean = false;
  isDialog: boolean = false;
  isModal: boolean = false;
  isSend: boolean = false;
  rout: TRoutDialog = '/group';
  dialogID: string = '';
  redirectTimer: number = 0;
  isCreate: boolean = false;

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private query: QueriesService,
    private alertService: AlertsService,
    private router: Router
  ) {
  }

  toggleModal() {
    this.isModal = !this.isModal;
  }

  deleteItem() {
    const groupName = this.item.item.name.S;
    this.isSend = true;
    this.query.deleteGroup(this.dialogID).subscribe(
      () => {
        this.store.dispatch(deleteGroup({ groupID: this.dialogID }));
        const message = `${groupName} group removed`;
        this.alertService.updateAlert({ message, type: 'success', isShow: true });
        this.targetDelete.emit(true);
      },
      (error) => {
        const message = error.error?.message || `Failed to remove ${groupName} group`;
        this.alertService.updateAlert({ message, type: 'error', isShow: true });
        this.isSend = false;
      }
    );
  }

  navigate() {
    if (this.dialogID) {
      this.router.navigate([this.rout, this.dialogID]);
    } else {
      const companion = (this.item.item as IPeopleItem).uid.S;
      this.isCreate = true;
      this.query.postConversation(companion).subscribe(
        (response) => {
          const data = (response as { conversationID: string }).conversationID;
          this.store.dispatch(addConversationPeople({ uid: companion, conversation: data }));
          this.isCreate = false;
          this.redirectTimer = 9;
          const interval = setInterval(() => {
            if (this.redirectTimer) this.redirectTimer -= 1;
            else {
              clearInterval(interval);
              this.router.navigate([this.rout, data]);
            }
          }, 1000);
        },
        () => {
          const message = 'Failed to create conversation';
          this.alertService.updateAlert({ message, type: 'error', isShow: true });
          this.isCreate = false;
        }
      );
    }
  }

  ngOnInit() {
    if (this.item.type === 'group') {
      this.dialogID = (this.item.item as IGroupItem).id.S;
      this.isMe = (this.item.item as IGroupItem).createdBy?.S === this.auth.getUid();
    } else {
      this.dialogID = (this.item.item as IPeopleItem).conversation || '';
      this.rout = '/conversation';
      this.isDialog = !!this.dialogID;
    }
  }
}
