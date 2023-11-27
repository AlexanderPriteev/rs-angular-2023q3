import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DateValidateService {
  date: number = -1;

  validate(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const currentDate = new Date().getTime();
      this.date = new Date(control.value).getTime();
      return this.date > currentDate || this.date < 0 ? { date: true } : null;
    };
  }
}
