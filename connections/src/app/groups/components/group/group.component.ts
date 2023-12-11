import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { QueriesService } from '../../../api/services/queries.service';
import { AuthService } from '../../../auth/services/auth.service';
import { addGroup, setGroups } from '../../../redux/actions/groups.action';
import { setPeople } from '../../../redux/actions/people.action';
import { IGroups, IPeople } from '../../../redux/interfaces/groups';
import {
  IGroupItem, IGroupResponse, IItem, IPeopleItem
} from '../../../redux/interfaces/items';
import { AppState } from '../../../redux/interfaces/state';
import { selectGroups } from '../../../redux/selectors/groups.selector';
import { selectPeople } from '../../../redux/selectors/people.selector';
import { AlertsService } from '../../../shared/services/alerts.service';
import { GroupCardComponent } from '../group-card/group-card.component';

export type ColumnType = 'people' | 'group';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    CommonModule, GroupCardComponent, FormsModule
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent implements OnInit {
  @Input() type: ColumnType = 'group';
  isShowModal: boolean = false;
  newGroupName: string = '';
  newGroupError: string = '';
  isSend: boolean = false;
  items: IItem[] = [];
  timer: string = 'update';
  isUpdate: boolean = false;

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private query: QueriesService,
    private alertService: AlertsService
  ) {
  }

  countDown(time: number) {
    let timer = time;
    const interval = setInterval(() => {
      this.timer = String(timer);
      if (timer) timer -= 1;
      else {
        this.timer = 'update';
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
        this.store.dispatch(setPeople({ people: data.Items }));
        if (timer) this.countDown(59);
        this.items = data.Items
          .map((e) => ({ type: this.type, item: e }))
          .sort((a, b) => a.item.name.S.localeCompare(b.item.name.S));
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
    this.timer = '60';
    this.updateColum(true);
  }

  createGroup() {
    if (!this.newGroupName) {
      this.newGroupError = 'Enter the group name';
      return;
    }

    if (!this.isSend) {
      this.isSend = true;
      this.query.createGroup(this.newGroupName).subscribe(
        (response) => {
          const newItem: IItem = {
            type: 'group',
            item: {
              id: { S: (response as IGroupResponse).groupID },
              name: { S: this.newGroupName },
              createdAt: { S: String(new Date().getTime()) },
              createdBy: { S: this.auth.getUid() }
            }
          };
          this.store.dispatch(addGroup({ group: newItem.item as IGroupItem }));
          this.items.unshift(newItem);
          const message = `${this.newGroupName} group created`;
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
    this.newGroupName = '';
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
  }
}
