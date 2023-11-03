import { Component } from '@angular/core';

import { LoginService } from '../../../auth/services/login.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  constructor(private loginService: LoginService) {}

  logout(): void {
    this.loginService.logout();
  }
}
