import { Component } from '@angular/core';
import {
  FormControl, FormGroup, Validators
} from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { checkPass, passValidate } from './validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', passValidate())
  });
  nameErrorValue = '';
  passErrorValue = '';

  constructor(private loginService: LoginService) {}

  login(): void {
    this.nameErrorValue = '';
    this.passErrorValue = '';
    const name = this.loginForm.controls['username'];
    const pass = this.loginForm.controls['password'];
    if (name.valid && pass.valid) {
      this.loginService.login(name.value, pass.value);
    } else {
      if (name.errors) {
        if (name.errors['required']) {
          this.nameErrorValue = 'Please enter a login email';
        } else if (name.errors['email']) {
          this.nameErrorValue = 'The login email is invalid';
        }
      }
      if (pass.errors) {
        this.passErrorValue = `Your password isn't strong enough: ${checkPass(pass.value).join(', ')}`;
      }
    }
  }
}
