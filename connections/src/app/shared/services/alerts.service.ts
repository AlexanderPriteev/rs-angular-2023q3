import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IAlerts } from '../interfaces/alerts';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private alertSubject = new BehaviorSubject<IAlerts>({} as IAlerts);
  alert$ = this.alertSubject.asObservable();
  updateAlert(alert: IAlerts): void {
    this.alertSubject.next({ ...alert });
  }
}
