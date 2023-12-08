import { CommonModule } from '@angular/common';
import {
  Component, ElementRef, OnInit, ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { QueriesService } from '../../../api/services/queries.service';
import { setProfile } from '../../../redux/actions/profile.action';
import { IProfile, IProfileState } from '../../../redux/interfaces/profile';
import { AppState } from '../../../redux/interfaces/state';
import { selectProfile } from '../../../redux/selectors/profile.selector';
import { parseDateByStamp } from '../../../shared/functions/parseDateByStamp';
import { AlertsService } from '../../../shared/services/alerts.service';

@Component({
  selector: 'app-profile-data',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class ProfileDataComponent implements OnInit {
  profile: IProfileState = {
    email: '',
    name: '',
    uid: '',
    createdAt: '',
  } as IProfileState;
  isEdit: boolean = false;
  editedNameValue: string = this.profile.name;
  @ViewChild('nameField') nameField!: ElementRef;

  constructor(
    private store: Store<AppState>,
    private query: QueriesService,
    private alert: AlertsService
  ) {
  }

  editMode() {
    this.isEdit = true;
    this.nameField.nativeElement.select();
  }
  cancelEdit() {
    this.isEdit = false;
    this.profile.name = this.editedNameValue;
  }
  saveEdit() {
    this.isEdit = false;
    this.editedNameValue = this.profile.name;
  }

  ngOnInit() {
    this.store.select(selectProfile).subscribe((state) => {
      if (state.uid) {
        this.profile = state;
      } else {
        this.query.profile().subscribe((response) => {
          const data = response as IProfile;
          const date = parseDateByStamp(data.createdAt.S);
          this.profile = {
            email: data.email.S,
            name: data.name.S,
            uid: data.uid.S,
            createdAt: date
          };

          this.store.dispatch(setProfile({ profile: this.profile }));
        }, (error) => {
          const message = error.error?.message || 'An unexpected error';
          this.alert.updateAlert({ message, type: 'error', isShow: true });
        });
      }
      this.editedNameValue = this.profile.name;
    });
  }
}
