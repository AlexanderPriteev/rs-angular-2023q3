import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authTokenKey = 'authToken';
  constructor(private router: Router) {
  }

  login(username: string, password: string): void {
    localStorage.setItem(this.authTokenKey, username + password);
    this.router.navigate(['/']);
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }
}
