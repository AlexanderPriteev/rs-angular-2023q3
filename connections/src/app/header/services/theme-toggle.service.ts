import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeToggleService {
  private localeTheme: boolean = localStorage.getItem('colorTheme') === 'dark';
  private darkTheme = new BehaviorSubject<boolean>(this.localeTheme);
  isDarkTheme = this.darkTheme.asObservable();

  toggleTheme() {
    const newThemeValue = !this.darkTheme.value;
    this.darkTheme.next(newThemeValue);
    localStorage.setItem('colorTheme', `${newThemeValue ? 'dark' : 'light'}`);
  }
}
