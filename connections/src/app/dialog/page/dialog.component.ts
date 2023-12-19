import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { setGroups } from '../../redux/actions/groups.action';
import { setPeople } from '../../redux/actions/people.action';
import { IGroups, IPeople } from '../../redux/interfaces/groups';
import { IConversation, IConversationList, IPeopleItem } from '../../redux/interfaces/items';
import { IDialog, IMessage } from '../../redux/interfaces/message';
import { AppState } from '../../redux/interfaces/state';
import { selectGroupDialog, selectPeopleDialog } from '../../redux/selectors/dialog.selector';
import { selectGroups } from '../../redux/selectors/groups.selector';
import { selectPeople } from '../../redux/selectors/people.selector';
import { AlertsService } from '../../shared/services/alerts.service';
import { TimerService } from '../../shared/services/timer.service';
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
export class DialogComponent implements OnInit, OnDestroy {
  dialogID: string = '';
  type: string = '';
  dialog: IMessage[] = [];
  timer: number = 0;
  isMyGroup: boolean = false;
  dialogName: string = '';
  isPreloader: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private query: QueriesService,
    private alertService: AlertsService,
    private auth: AuthService,
    private timerService: TimerService
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
              const list = response as IGroups;
              this.store.dispatch(setGroups({ groups: list.Items }));
              const group = list.Items
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

  getPeopleName(
    state: IPeopleItem[] | null,
    list: IConversation[] | null = null,
    map: Map<string, string> | null = null,
  ) {
    if (this.type !== 'conversation') return;
    if (list && map) {
      const name = list.find((e) => e.id.S === this.dialogID);
      if (name) {
        this.dialogName = map.get(name.companionID.S) || 'Me';
      }
    }
    if (!state) return;
    const people = state.find((e) => e.conversation === this.dialogID);
    if (people) this.dialogName = people.name.S;
  }

  getConversation(map: Map<string, string>, data: IPeople) {
    this.query.getConversationList().subscribe(
      (responseConversation) => {
        const list = responseConversation as IConversationList;
        this.getPeopleName(null, list.Items, map);
        const listMap = list.Items
          .reduce((s, c) => s.set(c.companionID.S, c.id.S), new Map());

        const items = data.Items.map((e) => {
          if (listMap.has(e.uid.S)) e.conversation = listMap.get(e.uid.S);
          return e;
        });
        this.store.dispatch(setPeople({ people: items }));
        this.isPreloader = false;
      },
      () => {
        this.isPreloader = false;
        this.alertService.updateAlert({ message: 'Failed to load', type: 'error', isShow: true });
      }
    );
  }

  getPeopleQuery(time: number = 0) {
    this.query.getPeople().subscribe(
      (response) => {
        const data = response as IPeople;
        const map = data.Items.reduce(
          (s, c) => s.set(c.uid.S, c.name.S),
          new Map<string, string>()
        );
        this.getDialog(map, time);
        this.getConversation(map, data);
      },
      () => {
        this.isPreloader = false;
        const message = 'Failed to load people names';
        this.alertService.updateAlert({ message, type: 'error', isShow: true });
      }
    );
  }

  getPeople(time: number = 0) {
    this.store.select(selectPeople).pipe(take(1))
      .subscribe((state) => {
        if (state.length) {
          this.getPeopleName(state);
          const map = state.reduce(
            (s, c) => s.set(c.uid.S, c.name.S),
            new Map<string, string>()
          );
          this.getDialog(map, time);
          this.isPreloader = false;
        } else {
          this.getPeopleQuery(time);
        }
      });
  }

  countTimer() {
    if (this.timer !== -1 && !this.timerService.getTimerValue(this.dialogID)) return;
    if (this.timer === -1) this.timerService.setTimerValue(this.dialogID, 60);
    const interval = setInterval(() => {
      this.timer = this.timerService.getTimerValue(this.dialogID);
      if (!this.timer) clearInterval(interval);
    }, 1000);
  }

  dialogUpdate(data: IDialog, time: number = 0) {
    const newData: IDialog = {
      ...data,
      lastUpdate: new Date().getTime() - 1000
    };
    const propsData = {
      messages: newData.Items,
      lastUpdate: newData.lastUpdate as number
    };

    if (this.type === 'group') {
      this.getGroups();
      if (time) {
        this.store.dispatch(updateGroupDialog({ groupName: this.dialogID, ...propsData }));
      } else {
        this.store.dispatch(addGroupDialog({ groupName: this.dialogID, group: newData }));
      }
    } else if (time) {
      this.store.dispatch(updatePeopleDialog({ peopleName: this.dialogID, ...propsData }));
    } else {
      this.store.dispatch(addPeopleDialog({ peopleName: this.dialogID, group: newData }));
    }
  }

  dialogFilter(messages: IMessage[], map: Map<string, string>): IMessage[] {
    const setItems = this.dialog.reduce((s, c) => s
      .add(`${c.createdAt.S}-${c.authorID.S}`), new Set<string>());
    return  messages
      .filter(e => !setItems.has(`${e.createdAt.S}-${e.authorID.S}`))
      .map((e) => ({ ...e, authorName: map.get(e.authorID.S) || '' }))
      .sort((a, b) => Number(a.createdAt.S) - Number(b.createdAt.S));
  }

  getDialog(map: Map<string, string>, time: number = 0) {
    const query = this.type === 'group'
      ? this.query.getGroupByID(this.dialogID, time)
      : this.query.getPeopleByID(this.dialogID, time);

    query.subscribe(
      (response) => {
        const data = response as IDialog;
        data.Items = this.dialogFilter(data.Items, map);
        this.dialog = this.dialog.concat(data.Items);
        this.countTimer();
        this.dialogUpdate(data, time);
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
    this.timer = this.timerService.getTimerValue(this.dialogID);
    this.updateState();
  }

  ngOnDestroy() {
    this.timerService.setTimerValue(this.dialogID, this.timer);
  }
}
