import { Component } from '@angular/core';
import {
  FormControl, FormGroup, Validators
} from '@angular/forms';

import { checkPass, passValidate } from '../../services/check-password.service';
import { LoginService } from '../../services/login.service';

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

  // checkPass(str: string): string[] {
  //   const result: string[] = [];
  //   if (str.length < 8) {
  //     result.push('at least 8 characters');
  //   }
  //   if (!/(?=.*[a-z])(?=.*[A-Z])/.test(str)) {
  //     result.push('a mixture of both uppercase and lowercase letters');
  //   }
  //   if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(str)) {
  //     result.push('a mixture of letters and numbers');
  //   }
  //   if (!/(?=.*[!@#?\]])/.test(str)) {
  //     result.push('inclusion of at least one special character, e.g., ! @ # ? ]');
  //   }
  //   return result;
  // }

  // passValidate(): ValidatorFn {
  //   return (control: AbstractControl) : ValidationErrors | null => {
  //     const arr = this.checkPass(control.value);
  //     return arr.length ? { pass: true } : null;
  //   };
  // }

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
