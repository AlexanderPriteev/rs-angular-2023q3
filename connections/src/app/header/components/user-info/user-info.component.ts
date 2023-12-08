import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';

import { AuthService } from '../../../auth/services/auth.service';
import { LogoutService } from '../../../auth/services/logout.service';
import { UserNameService } from '../../../auth/services/user-name.service';
import { AppState } from '../../../redux/interfaces/state';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {
  currentURL = '/';
  isAuth = false;
  userEmail = '';
  constructor(
    private store: Store<AppState>,
    public logoutService: LogoutService,
    private authService: AuthService,
    private router: Router,
    private user: UserNameService
  ) {
  }

  logout() {
    this.logoutService.logout(this.store);
  }

  ngOnInit() {
    this.user.userName.subscribe((email) => {
      this.userEmail = email;
    });
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.isAuth = !!this.authService.getToken();
      if (event instanceof NavigationEnd) {
        this.currentURL = event.url;
      }
    });
  }
}
