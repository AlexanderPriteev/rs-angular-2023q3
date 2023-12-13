import { CommonModule } from '@angular/common';
import {
  Component, Input, OnDestroy, OnInit
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { QueriesService } from '../../../api/services/queries.service';
import { AuthService } from '../../../auth/services/auth.service';
import { addGroup, setGroups } from '../../../redux/actions/groups.action';
import { setPeople } from '../../../redux/actions/people.action';
import { IGroups, IPeople } from '../../../redux/interfaces/groups';
import {
  IConversationList,
  IGroupItem, IGroupResponse, IItem, IPeopleItem
} from '../../../redux/interfaces/items';
import { AppState } from '../../../redux/interfaces/state';
import { selectGroups } from '../../../redux/selectors/groups.selector';
import { selectPeople } from '../../../redux/selectors/people.selector';
import { AlertsService } from '../../../shared/services/alerts.service';
import { TimerService } from '../../../shared/services/timer.service';
import { GroupCardComponent } from '../group-card/group-card.component';

export type ColumnType = 'people' | 'group';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    CommonModule, GroupCardComponent, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent implements OnInit, OnDestroy {
  @Input() type: ColumnType = 'group';
  isShowModal: boolean = false;
  newGroupError: string = '';
  isSend: boolean = false;
  items: IItem[] = [];
  itemsWithoutSearch: IItem[] = [];
  timer: number = 0;
  isUpdate: boolean = false;
  isSearch: boolean = false;

  newGroupName = new FormControl('');
  isDisabled: boolean = true;

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private query: QueriesService,
    private alertService: AlertsService,
    private timerService: TimerService
  ) {
  }

  toggleSearch() {
    this.isSearch = !this.isSearch;
  }
  toggleModalBtn() {
    const str = this.newGroupName.value || '';
    this.isDisabled = /(?=.*[^a-zA-z\s\d])/.test(str) || str.length > 40 || !str.length;
  }

  onInputChange(event: Event) {
    const text = (event.target as HTMLInputElement).value;
    this.items = this.itemsWithoutSearch
      .filter((e) => e.item.name.S.toLowerCase().includes(text.toLowerCase()));
  }

  countDown(time: number) {
    if (time <= 0) return;
    this.timerService.setTimerValue(this.type, time);
    this.isUpdate = true;
    const interval = setInterval(() => {
      this.timer = this.timerService.getTimerValue(this.type);
      if (!this.timer) {
        this.isUpdate = false;
        clearInterval(interval);
      }
    }, 1000);
  }

  getGroup(timer: boolean = false) {
    if (timer) this.isUpdate = true;
    this.query.getGroups().subscribe(
      (response) => {
        const data = response as IGroups;
        this.store.dispatch(setGroups({ groups: data.Items }));
        if (timer) this.countDown(59);
        this.items = data.Items
          .map((e) => ({ type: this.type, item: e }))
          .sort((a, b) => a.item.name.S.localeCompare(b.item.name.S));
        this.itemsWithoutSearch = [...this.items];
      },
      (error) => {
        const message = error.error?.message || 'Failed to load groups';
        this.alertService.updateAlert({ message, type: 'error', isShow: true });
        this.isUpdate = false;
      }
    );
  }

  getPeople(timer: boolean = false) {
    if (timer) this.isUpdate = true;
    this.query.getPeople().subscribe(
      (response) => {
        const data = response as IPeople;
        this.query.getConversationList().subscribe(
          (responseConversation) => {
            const list = responseConversation as IConversationList;
            const map = list.Items
              .reduce((s, c) => s.set(c.companionID.S, c.id.S), new Map());
            const items = data.Items.map((e) => {
              if (map.has(e.uid.S)) e.conversation = map.get(e.uid.S);
              return e;
            });
            this.store.dispatch(setPeople({ people: items }));
            if (timer) this.countDown(59);
            this.items = items
              .map((e) => ({ type: this.type, item: e }))
              .sort((a, b) => a.item.name.S.localeCompare(b.item.name.S));
            this.itemsWithoutSearch = [...this.items];
          },
          () => {
            this.alertService.updateAlert({ message: 'Failed to load', type: 'error', isShow: true });
            this.isUpdate = false;
          }
        );
      },
      (error) => {
        const message = error.error?.message || 'Failed to load people';
        this.alertService.updateAlert({ message, type: 'error', isShow: true });
        this.isUpdate = false;
      }
    );
  }

  getState(state: IGroupItem[] | IPeopleItem[]) {
    if (state.length) {
      this.items = state
        .map((e) => ({ type: this.type, item: e }))
        .sort((a, b) => a.item.name.S.localeCompare(b.item.name.S));
      this.itemsWithoutSearch = [...this.items];
    } else if (this.type === 'group') this.getGroup();
    else this.getPeople();
  }

  updateColum(timer: boolean = false) {
    if (this.type === 'group') {
      this.getGroup(timer);
    } else {
      this.getPeople(timer);
    }
  }

  updateGroupTimer() {
    // this.timer = 60;
    this.updateColum(true);
  }

  createGroup() {
    if (!this.newGroupName) {
      this.newGroupError = 'Enter the group name';
      return;
    }

    if (!this.isSend) {
      this.isSend = true;
      this.query.createGroup(this.newGroupName.value || '').subscribe(
        (response) => {
          const newItem: IItem = {
            type: 'group',
            item: {
              id: { S: (response as IGroupResponse).groupID },
              name: { S: this.newGroupName.value || '' },
              createdAt: { S: String(new Date().getTime()) },
              createdBy: { S: this.auth.getUid() }
            }
          };
          this.store.dispatch(addGroup({ group: newItem.item as IGroupItem }));
          this.items.unshift(newItem);
          this.itemsWithoutSearch.unshift(newItem);
          const message = `${this.newGroupName.value} group created`;
          this.alertService.updateAlert({ message, type: 'success', isShow: true });
          this.isSend = false;
          this.toggleModal();
        },
        (error) => {
          const message = error.error?.message || 'Failed to create group';
          this.alertService.updateAlert({ message, type: 'error', isShow: true });
          this.isSend = false;
        }
      );
    }
  }

  toggleModal() {
    this.isShowModal = !this.isShowModal;
    this.newGroupError = '';
    this.newGroupName.setValue('');
  }

  updateState() {
    if (this.type === 'group') {
      this.store.select(selectGroups).pipe(take(1))
        .subscribe((state) => this.getState(state));
    } else {
      this.store.select(selectPeople).pipe(take(1))
        .subscribe((state) => this.getState(state));
    }
  }

  ngOnInit() {
    this.updateState();
    this.countDown(this.timerService.getTimerValue(this.type));
  }

  ngOnDestroy() {
    this.timerService.setTimerValue(this.type, this.timer);
  }
}
