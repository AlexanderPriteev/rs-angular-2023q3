import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidate(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const currentDate = new Date().getTime();
    const date = new Date(control.value).getTime();
    return date > currentDate || date < 0 ? { date: true } : null;
  };
}
