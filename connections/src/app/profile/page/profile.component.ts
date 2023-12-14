import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { LogoutService } from '../../auth/services/logout.service';
import { AppState } from '../../redux/interfaces/state';
import { ProfileBtnComponent } from '../components/btn/btn.component';
import { ProfileDataComponent } from '../components/data/data.component';
import { ProfileHeadlineComponent } from '../components/headline/headline.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProfileHeadlineComponent,
    ProfileDataComponent,
    ProfileBtnComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private store: Store<AppState>, private logoutService: LogoutService) {
  }
  logout() {
    this.logoutService.logout(this.store);
  }
}
