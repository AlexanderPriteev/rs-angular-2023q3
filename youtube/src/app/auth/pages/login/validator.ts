import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkPass(str: string): string[] {
  const result: string[] = [];
  if (str.length < 8) {
    result.push('at least 8 characters');
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])/.test(str)) {
    result.push('a mixture of both uppercase and lowercase letters');
  }
  if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(str)) {
    result.push('a mixture of letters and numbers');
  }
  if (!/(?=.*[!@#?$%^&*()_+{}[\]:;<>,.?~\\-])/.test(str)) {
    result.push('inclusion of at least one special character, e.g., ! @ # ? ]');
  }
  return result;
}

export function passValidate(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const arr = checkPass(control.value);
    return arr.length ? { pass: true } : null;
  };
}
