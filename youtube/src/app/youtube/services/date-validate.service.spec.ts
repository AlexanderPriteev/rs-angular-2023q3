import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { DateValidateService } from './date-validate.service';

describe('DateValidaterService', () => {
  let service: DateValidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateValidateService);
  });

  it('should return null for a valid date', () => {
    const control = new FormControl(new Date());
    expect(service.validate()(control)).toBeNull();
  });
  it('should return true for an invalid date', () => {
    const control = new FormControl(new Date(new Date().getDate() + 1, 1));
    expect(service.validate()(control)).toEqual({ date: true });
  });
});
