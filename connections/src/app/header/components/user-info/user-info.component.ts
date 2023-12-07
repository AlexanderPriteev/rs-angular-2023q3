import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

import { AuthService } from '../../../auth/services/auth.service';
import { LogoutService } from '../../../auth/services/logout.service';

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
  constructor(
    public logoutService: LogoutService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
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
