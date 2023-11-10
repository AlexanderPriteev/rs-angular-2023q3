import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LoggerService } from '../../core/services/logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authTokenKey = 'authToken';
  constructor(private router: Router, private logger: LoggerService) {
  }

  login(username: string, password: string): void {
    localStorage.setItem(this.authTokenKey, `${username}:${password}`);
    this.logger.logMessage(`${username} has logged in.`);
    this.router.navigate(['/']);
  }

  logout(): void {
    if (localStorage.getItem(this.authTokenKey)) {
      const username = localStorage.getItem(this.authTokenKey)?.split(':')[0];
      localStorage.removeItem(this.authTokenKey);
      this.logger.logMessage(`${username} has logged out.`);
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }
}
