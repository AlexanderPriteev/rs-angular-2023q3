import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { IAuth } from '../../../api/interfaces/interfaces';
import { QueriesService } from '../../../api/services/queries.service';
import { AlertsComponent } from '../../../shared/components/alerts/alerts.component';
import { AlertsService } from '../../../shared/services/alerts.service';
import { AuthService } from '../../services/auth.service';
import { UserNameService } from '../../services/user-name.service';

type SignInFields = 'email' | 'password';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, AlertsComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  errors = {
    email: '',
    password: ''
  };
  blackList = new Set<string>();
  isHidePassword = true;
  isFormValid = false;
  isLoad = false;

  constructor(
    private query: QueriesService,
    private router: Router,
    private alertService: AlertsService,
    private auth: AuthService,
    private userName: UserNameService
  ) {}

  togglePasswordType() {
    this.isHidePassword = !this.isHidePassword;
  }

  fieldValidate(fieldName: SignInFields): boolean {
    this.errors[fieldName] = '';
    const field = this.signInForm.controls[fieldName];
    if (field.errors) {
      if (field.errors['required']) {
        this.errors[fieldName] = `Please enter a ${fieldName}`;
      } else {
        this.errors[fieldName] = `The ${fieldName} is invalid`;
      }
      return false;
    }

    return this.checkBlackList();
  }

  sendForm() {
    if (this.isFormValid) {
      this.isLoad = true;
      const formData = { ...this.signInForm.value };

      this.query.signIn(formData).subscribe(
        (response) => {
          const data = response as IAuth;
          const email = this.signInForm.controls['email'].value;
          this.auth.setData(data.token, data.uid, email);
          this.isLoad = false;
          this.userName.setUserName(email);
          this.router.navigate(['/']);
          const message = `User ${email} has successfully logged in`;
          this.alertService.updateAlert({ message, type: 'success', isShow: true });
        },
        (error) => {
          const message = error.error?.message || 'An unexpected error';
          if (error.error?.type === 'NotFoundException') {
            this.blackList.add(JSON.stringify(this.signInForm.value));
            this.checkBlackList();
            this.isFormValid = false;
          }
          this.isLoad = false;
          this.alertService.updateAlert({ message, type: 'error', isShow: true });
        }

      );
    }
  }

  checkBlackList():boolean {
    const value = 'Email or password is invalid';
    if (this.blackList.has(JSON.stringify(this.signInForm.value))) {
      this.errors = { email: value, password: value };
      this.isFormValid = false;
      return false;
    }
    if (this.errors.email === value) this.errors.email = '';
    if (this.errors.password === value) this.errors.password = '';
    return true;
  }

  ngOnInit() {
    this.signInForm.valueChanges.subscribe(() => {
      this.isFormValid = this.signInForm.valid;
      this.checkBlackList();
    });
  }
}
