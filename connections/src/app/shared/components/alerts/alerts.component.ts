import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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

  constructor(private service: AlertsService) {}

  close(): void {
    this.service.updateAlert({ ...this.alert, isShow: false });
  }

  ngOnInit() {
    this.service.alert$.pipe().subscribe((alert) => {
      this.alert = alert;
      setTimeout(() => this.close(), 12000);
    });
  }
}
