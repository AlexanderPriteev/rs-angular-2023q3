import { Component } from '@angular/core';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  constructor(private loginService: LoginService) {}

  login(): void {
    this.loginService.login(this.username, this.password);
  }
}
