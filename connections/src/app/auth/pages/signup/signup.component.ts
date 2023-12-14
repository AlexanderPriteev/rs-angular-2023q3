import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { QueriesService } from '../../../api/services/queries.service';
import { AlertsComponent } from '../../../shared/components/alerts/alerts.component';
import { AlertsService } from '../../../shared/services/alerts.service';
import { FieldValidate } from '../../services/field-validate.service';

type SignUpFields = 'name' | 'email' | 'password' | 'repeatPassword';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, AlertsComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, new FieldValidate().name()]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, new FieldValidate().pass()]),
    repeatPassword: new FormControl('', [Validators.required])
  });
  errors = {
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  };
  blackListEmail = new Set<string>();
  isHidePassword = true;
  isFormValid = false;
  isLoad = false;

  constructor(private query: QueriesService, private router: Router, private alertService: AlertsService) {
  }

  togglePasswordType(): void {
    this.isHidePassword = !this.isHidePassword;
  }

  fieldValidate(fieldName: SignUpFields): boolean {
    this.errors[fieldName] = '';
    const field = this.signUpForm.controls[fieldName];
    if (field.errors) {
      if (field.errors['required']) {
        this.errors[fieldName] = `Please enter a ${fieldName}`;
      } else {
        switch (fieldName) {
          case 'name':
            this.errors.name = (new FieldValidate().checkName(field.value)).join(', ');
            break;
          case 'email':
            this.errors.email = 'The email is invalid';
            break;
          case 'password':
            this.errors.password = (new FieldValidate().checkPass(field.value)).join(', ');
            break;
          default: this.errors[fieldName] = 'The field is invalid';
        }
      }
      return false;
    }
    if (fieldName === 'repeatPassword') {
      if (field.value !== this.signUpForm.controls['password'].value) {
        this.errors.repeatPassword = 'The passwords must match';
      }
      return false;
    }
    if (fieldName === 'email' && this.blackListEmail.has(field.value)) {
      this.errors.email = `User ${field.value} already exists`;
      return false;
    }
    return true;
  }

  sendForm(): void {
    if (this.isFormValid) {
      this.isLoad = true;
      const data = { ...this.signUpForm.value };
      delete data.repeatPassword;

      this.query.signUp(data).subscribe(
        () => {
          const message = `User ${this.signUpForm.controls['email'].value} successfully created`;
          this.isLoad = false;
          this.alertService.updateAlert({ message, type: 'success', isShow: true });
          this.router.navigate(['/']);
        },
        (error) => {
          const message = error.error?.message || 'An unexpected error';
          if (error.error?.type === 'PrimaryDuplicationException') {
            this.blackListEmail.add(this.signUpForm.controls['email'].value);
            this.errors.email = message;
            this.isFormValid = false;
          }
          this.isLoad = false;
          this.alertService.updateAlert({ message, type: 'error', isShow: true });
        }
      );
    }
  }

  ngOnInit() {
    this.signUpForm.valueChanges.subscribe(() => {
      const password = this.signUpForm.controls['password'].value;
      const repeatPassword = this.signUpForm.controls['repeatPassword'].value;
      const isPassValid = password === repeatPassword;
      const validEmail = !this.blackListEmail.has(this.signUpForm.controls['email'].value);
      this.isFormValid = this.signUpForm.valid && isPassValid && validEmail;
    });
  }
}
