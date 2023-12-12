import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { QueriesService } from '../../api/services/queries.service';
import { AuthService } from '../../auth/services/auth.service';
import {
  addGroupDialog,
  addPeopleDialog,
  updateGroupDialog,
  updatePeopleDialog
} from '../../redux/actions/dialogs.action';
import { IGroups, IPeople } from '../../redux/interfaces/groups';
import { IDialog, IMessage } from '../../redux/interfaces/message';
import { AppState } from '../../redux/interfaces/state';
import { selectGroupDialog, selectPeopleDialog } from '../../redux/selectors/dialog.selector';
import { selectGroups } from '../../redux/selectors/groups.selector';
import { selectPeople } from '../../redux/selectors/people.selector';
import { AlertsService } from '../../shared/services/alerts.service';
import { ChatComponent } from '../components/chat/chat.component';
import { DialogHeadlineComponent } from '../components/headline/headline.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogHeadlineComponent,
    ChatComponent
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  dialogID: string = '';
  type: string = '';
  dialog: IMessage[] = [];
  timer: number = 0;
  isMyGroup: boolean = false;
  dialogName: string = '';

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private query: QueriesService,
    private alertService: AlertsService,
    private auth: AuthService
  ) {
  }

  getGroups() {
    const user = this.auth.getUid();
    this.store.select(selectGroups).pipe(take(1))
      .subscribe((state) => {
        if (state.length) {
          const group = state.find((e) => e.id.S === this.dialogID);
          if (group) {
            this.dialogName = group.name.S;
            this.isMyGroup = user === group.createdBy.S;
          }
        } else {
          this.query.getGroups().subscribe(
            (response) => {
              const group = (response as IGroups).Items
                .find((e) => e.id.S === this.dialogID);
              if (group) {
                this.dialogName = group.name.S;
                this.isMyGroup = user === group.createdBy.S;
              }
            },
            () => {
              const message = 'Failed to load groups';
              this.alertService.updateAlert({ message, type: 'error', isShow: true });
            }
          );
        }
      });
  }

  getPeople(time: number = 0) {
    this.store.select(selectPeople).pipe(take(1))
      .subscribe((state) => {
        if (state.length) {
          const map = state
            .reduce(
              (s, c) => s.set(c.uid.S, c.name.S),
              new Map<string, string>()
            );
          this.getDialog(map, time);
        } else {
          this.query.getPeople().subscribe(
            (response) => {
              const data = response as IPeople;
              const map = data.Items
                .reduce(
                  (s, c) => s.set(c.uid.S, c.name.S),
                  new Map<string, string>()
                );
              this.getDialog(map, time);
            },
            () => {
              const message = 'Failed to load people names';
              this.alertService.updateAlert({ message, type: 'error', isShow: true });
            }
          );
        }
      });
  }

  countTimer() {
    this.timer = 60;
    const interval = setInterval(() => {
      if (this.timer) this.timer -= 1;
      else {
        clearInterval(interval);
      }
    }, 1000);
  }

  getDialog(map: Map<string, string>, time: number = 0) {
    const query = this.type === 'group'
      ? this.query.getGroupByID(this.dialogID, time)
      : this.query.getPeopleByID(this.dialogID, time);

    query.subscribe(
      (response) => {
        const data = response as IDialog;
        data.Items = data.Items
          .map((e) => ({ ...e, authorName: map.get(e.authorID.S) || '' }))
          .sort((a, b) => Number(a.createdAt.S) - Number(b.createdAt.S));
        this.dialog = this.dialog.concat(data.Items);
        data.lastUpdate = new Date().getTime();
        if (this.timer) this.countTimer();
        if (this.type === 'group') {
          this.getGroups();
          if (time) {
            this.store.dispatch(updateGroupDialog({
              groupName: this.dialogID,
              messages: data.Items,
              lastUpdate: data.lastUpdate
            }));
          } else {
            this.store.dispatch(addGroupDialog({ groupName: this.dialogID, group: data }));
          }
        } else if (time) {
          this.store.dispatch(updatePeopleDialog({
            peopleName: this.dialogID,
            messages: data.Items,
            lastUpdate: data.lastUpdate
          }));
        } else {
          this.store.dispatch(addPeopleDialog({ peopleName: this.dialogID, group: data }));
        }
      },
      (error) => {
        const message = error.error?.message || 'Failed to load data';
        if (error.error?.type === 'InvalidIDException') {
          this.router.navigateByUrl('**', { skipLocationChange: true });
        }
        this.alertService.updateAlert({ message, type: 'error', isShow: true });
        this.timer = 0;
      }
    );
  }

  updateState(isTimer: boolean = false) {
    if (isTimer) this.timer = -1;

    if (this.type === 'group') {
      this.store.select(selectGroupDialog(this.dialogID)).pipe(take(1)).subscribe(
        (state) => {
          this.dialog = state ? state.Items : [];
          this.getPeople(state ? state.lastUpdate || 0 : 0);
        }
      );
    } else {
      this.store.select(selectPeopleDialog(this.dialogID)).pipe(take(1)).subscribe(
        (state) => {
          this.dialog = state ? state.Items : [];
          this.getPeople(state ? state.lastUpdate || 0 : 0);
        }
      );
    }
  }

  sendMessage(message: string) {
    const query = this.type === 'group'
      ? this.query.postGroupMessage(this.dialogID, message)
      : this.query.postPeopleMessage(this.dialogID, message);
    query.subscribe(
      () => {
        this.updateState();
      },
      (error) => {
        const errorText = error.error?.message || 'Failed to send the message';
        this.alertService.updateAlert({ message: errorText, type: 'error', isShow: true });
      }
    );
  }

  ngOnInit() {
    [this.type, this.dialogID] = this.route.snapshot.url.map((e) => e.path);
    this.updateState();
  }
}
