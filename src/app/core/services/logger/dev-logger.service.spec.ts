import { TestBed } from '@angular/core/testing';

import { DevLoggerService } from './dev-logger.service';

describe('DevLoggerService', () => {
  let service: DevLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevLoggerService);
  });

  it('should log message', () => {
    const defaultMessage = '[DEV]: App is running in the development mode\n';
    const logSpy = jest.spyOn(console, 'log');
    const testMessage = 'Test';
    service.logMessage(testMessage);
    expect(logSpy).toHaveBeenCalledWith(`${defaultMessage}${testMessage}`);
  });
});
