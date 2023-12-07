import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { QueriesService } from '../../api/services/queries.service';
import { AlertsService } from '../../shared/services/alerts.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  isActive = true;
  constructor(
    private query: QueriesService,
    private router: Router,
    private alertService: AlertsService,
    private authService: AuthService
  ) { }

  logout() {
    if (!this.isActive) return;
    this.isActive = false;
    this.query.logout().subscribe(
      () => {
        this.authService.clear();
        this.router.navigate(['/signin']);
        this.isActive = true;
      },
      (error) => {
        const message = error.error?.message || 'An unexpected error';
        this.alertService.updateAlert({ message, type: 'error', isShow: true });
        this.isActive = true;
      }
    );
  }
}
