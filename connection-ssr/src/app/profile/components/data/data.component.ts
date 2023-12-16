import { CommonModule } from '@angular/common';
import {
  Component, ElementRef, OnInit, ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { QueriesService } from '../../../api/services/queries.service';
import { FieldValidate } from '../../../auth/services/field-validate.service';
import { setProfile, updateProfile } from '../../../redux/actions/profile.action';
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
  isSend: boolean = false;
  nameError: string = '';
  currentName: string = this.profile.name;
  editedNameValue: string = this.profile.name;
  @ViewChild('nameField') nameField!: ElementRef;

  constructor(
    private store: Store<AppState>,
    private query: QueriesService,
    private alert: AlertsService,
    private validate: FieldValidate
  ) {
  }

  editMode() {
    this.isEdit = true;
    this.nameField.nativeElement.select();
  }
  cancelEdit() {
    if (this.isSend) return;
    this.isEdit = false;
    this.nameError = '';
    this.currentName = this.editedNameValue;
  }
  saveEdit() {
    this.nameError = this.validate.checkName(this.currentName)[0] || '';
    if (!this.currentName) {
      this.nameError = 'Please enter a name';
    }
    if (this.nameError) return;

    this.isSend = true;
    this.query.profileUpdate(this.currentName).subscribe(
      () => {
        const message = `User name updated to ${this.currentName}`;
        this.alert.updateAlert({ message, type: 'success', isShow: true });
        this.store.dispatch(updateProfile({ name: this.currentName }));
        this.editedNameValue = this.currentName;
        this.profile = { ...this.profile, name: this.currentName };
        this.isEdit = false;
        this.isSend = false;
      },
      (error) => {
        const message = error.error?.message || 'An unexpected error';
        this.alert.updateAlert({ message, type: 'error', isShow: true });
        this.isSend = false;
      },
    );
  }

  private queryProfile() {
    this.query.profile().subscribe((response) => {
      const data = response as IProfile;
      const date = parseDateByStamp(data.createdAt.S);
      this.profile = {
        email: data.email.S,
        name: data.name.S,
        uid: data.uid.S,
        createdAt: date
      };
      this.store.dispatch(setProfile({ profile: { ...this.profile } }));
      this.currentName = this.profile.name;
      this.editedNameValue = this.profile.name;
    }, (error) => {
      const message = error.error?.message || 'An unexpected error';
      this.alert.updateAlert({ message, type: 'error', isShow: true });
    });
  }

  ngOnInit() {
    this.store.select(selectProfile)
      .pipe(take(1))
      .subscribe((state) => {
        if (state.uid) {
          this.profile = state;
          this.currentName = this.profile.name;
          this.editedNameValue = this.profile.name;
        } else {
          this.queryProfile();
        }
      });
  }
}
