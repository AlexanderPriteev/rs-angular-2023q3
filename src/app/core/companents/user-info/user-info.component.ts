import {Component, Input, OnInit} from '@angular/core';

import { LoginService } from '../../../auth/services/login.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() currentURL: string = '/';
  userName = '';
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.currentUser.subscribe((currentUser: string) => {
      this.userName = currentUser;
    });
  }

  logout(): void {
    this.loginService.logout();
  }
}
