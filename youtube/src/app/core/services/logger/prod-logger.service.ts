import { Injectable } from '@angular/core';

import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ProdLoggerService extends LoggerService {
  private defaultMessage = '[PROD]: App is running in the production mode\n';
  logMessage(message: string): void {
    console.log(`${this.defaultMessage}${message}`);
  }
}
