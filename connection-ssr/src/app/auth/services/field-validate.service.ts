import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FieldValidate {
  private result: string[] = [];

  checkName(str: string) {
    this.result = [];
    if (/(?=.*[^a-zA-z\s])/.test(str)) {
      this.result.push('allowed only letters or spaces');
    }
    if (str.length > 40) {
      this.result.push('maximum 40 characters');
    }
    return this.result;
  }

  checkPass(str: string): string[] {
    this.result = [];
    if (str.length < 8) {
      this.result.push('at least 8 characters');
    }
    if (!/(?=.*[A-Z])/.test(str)) {
      this.result.push('include at least 1 capital letter');
    }
    if (!/(?=.*\d)/.test(str)) {
      this.result.push('include at least 1 digit');
    }
    if (!/(?=.*[!@#?$%^&*()_+{}[\]:;<>,.?~\\/-])/.test(str)) {
      this.result.push('include at least 1 special symbol !@#?$%^&*()_+{}[]:;<>,.?~\\/-');
    }
    return this.result;
  }

  name(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const arr = this.checkName(control.value);
      return arr.length ? { name: true } : null;
    };
  }

  pass(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const arr = this.checkPass(control.value);
      return arr.length ? { pass: true } : null;
    };
  }
}
