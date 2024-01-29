import { TestBed } from '@angular/core/testing';

import { ProdLoggerService } from './prod-logger.service';

describe('ProdLoggerService', () => {
  let service: ProdLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should log message', () => {
    const defaultMessage = '[PROD]: App is running in the production mode\n';
    const logSpy = jest.spyOn(console, 'log');
    const testMessage = 'Test';
    service.logMessage(testMessage);
    expect(logSpy).toHaveBeenCalledWith(`${defaultMessage}${testMessage}`);
  });
});
