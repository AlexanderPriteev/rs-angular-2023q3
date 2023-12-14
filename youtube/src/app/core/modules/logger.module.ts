import { isDevMode, NgModule } from '@angular/core';

import { DevLoggerService } from '../services/logger/dev-logger.service';
import { LoggerService } from '../services/logger/logger.service';
import { ProdLoggerService } from '../services/logger/prod-logger.service';

@NgModule({
  providers: [
    {
      provide: LoggerService,
      useFactory: () => (isDevMode() ? new DevLoggerService() : new ProdLoggerService()),
    },
  ],
})
export class LoggerModule { }
