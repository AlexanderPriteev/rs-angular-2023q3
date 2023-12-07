import { Component } from '@angular/core';

import { ProfileBtnComponent } from '../components/btn/btn.component';
import { ProfileDataComponent } from '../components/data/data.component';
import { ProfileHeadlineComponent } from '../components/headline/headline.component';
import {LogoutService} from "../../auth/services/logout.service";

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
  constructor(public logoutService: LogoutService) {
  }
}
