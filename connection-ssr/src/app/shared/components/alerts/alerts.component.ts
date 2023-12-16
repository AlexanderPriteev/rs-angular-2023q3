import {CommonModule, isPlatformBrowser} from '@angular/common';
import {Component, inject, Inject, NgZone, OnInit, PLATFORM_ID} from '@angular/core';

import { IAlerts } from '../../interfaces/alerts';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss'
})
export class AlertsComponent implements OnInit {
  alert: IAlerts = {
    message: '',
    type: 'error',
    isShow: false,
  };

  constructor(private service: AlertsService,
              @Inject(PLATFORM_ID) private platformId: object,
              private zone: NgZone) {}

  close(): void {
    this.service.updateAlert({ ...this.alert, isShow: false });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.service.alert$.subscribe((alert) => {
        this.alert = alert;
        this.zone.runOutsideAngular(() => {
          setTimeout(() => this.close(), 12000);
        });
      });
    }
  }
}
