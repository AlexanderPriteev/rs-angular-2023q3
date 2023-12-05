import { TestBed } from '@angular/core/testing';

import { PasswordCheckService } from './field-validate.service';

describe('PasswordCheckService', () => {
  let service: PasswordCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
