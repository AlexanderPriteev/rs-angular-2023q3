import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FieldValidate } from '../../services/field-validate.service';

type SignUpFields = 'name' | 'email' | 'password' | 'repeatPassword';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
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
  isHidePassword = true;
  isFormValid = false;

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
    return true;
  }

  checkFields(): void {
    let isValid = true;
    (Object.keys(this.signUpForm.controls) as SignUpFields[]).forEach((fieldName) => {
      const tmp = this.fieldValidate(fieldName);
      if (!tmp) {
        isValid = false;
      }
    });
    if (isValid) {
      const value = {
        email: this.signUpForm.controls['email'],
        name: this.signUpForm.controls['name'],
        password: this.signUpForm.controls['password'],
      };
      console.log(JSON.stringify(value));
    }
  }

  ngOnInit() {
    this.signUpForm.valueChanges.subscribe(() => {
      const password = this.signUpForm.controls['password'].value;
      const repeatPassword = this.signUpForm.controls['repeatPassword'].value;
      const isPassValid = password === repeatPassword;
      this.isFormValid = this.signUpForm.valid && isPassValid;
    });
  }
}
