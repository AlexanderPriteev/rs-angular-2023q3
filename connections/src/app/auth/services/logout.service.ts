import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { QueriesService } from '../../api/services/queries.service';
import { clearDialogs } from '../../redux/actions/dialogs.action';
import { clearGroup } from '../../redux/actions/groups.action';
import { clearPeople } from '../../redux/actions/people.action';
import { clearProfile } from '../../redux/actions/profile.action';
import { AppState } from '../../redux/interfaces/state';
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
    private authService: AuthService,

  ) { }

  logout(store: Store<AppState>) {
    if (!this.isActive) return;
    this.isActive = false;
    const exit = () => {
      this.authService.clear();
      this.router.navigate(['/signin']);
      this.isActive = true;
      store.dispatch(clearProfile());
      store.dispatch(clearDialogs());
      store.dispatch(clearGroup());
      store.dispatch(clearPeople());
    };
    this.query.logout().subscribe(
      () => {
        exit();
        const message = 'Logout was successful';
        this.alertService.updateAlert({ message, type: 'success', isShow: true });
      },
      (error) => {
        const message = error.error?.message || 'An unexpected error';
        this.alertService.updateAlert({ message, type: 'error', isShow: true });
        if (error.error?.type === 'InvalidTokenException'
           || error.error?.type === 'InvalidUserDataException') {
          exit();
        }
        this.isActive = true;
      }
    );
  }
}
