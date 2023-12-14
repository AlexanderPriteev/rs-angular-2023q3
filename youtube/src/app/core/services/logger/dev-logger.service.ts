import { Injectable } from '@angular/core';

import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class DevLoggerService extends LoggerService {
  private defaultMessage = '[DEV]: App is running in the development mode\n';
  logMessage(message: string): void {
    console.log(`${this.defaultMessage}${message}`);
  }
}
