import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { LoggerService } from '../../core/services/logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authTokenKey = 'authToken';
  private localUser = localStorage.getItem(this.authTokenKey)?.split(':')[0] || '';
  currentUser = new BehaviorSubject<string>(this.localUser);

  constructor(private router: Router, private logger: LoggerService) {
  }

  login(username: string, password: string): void {
    localStorage.setItem(this.authTokenKey, `${username}:${password}`);
    this.logger.logMessage(`${username} has logged in.`);
    this.router.navigate(['/']);
    this.currentUser.next(username);
  }

  logout(): void {
    if (this.isLoggedIn()) {
      localStorage.removeItem(this.authTokenKey);
      this.logger.logMessage(`${this.localUser} has logged out.`);
      this.currentUser.next('');
    }
  }

  isLoggedIn(): boolean {
    return !!this.currentUser.value;
  }
}
