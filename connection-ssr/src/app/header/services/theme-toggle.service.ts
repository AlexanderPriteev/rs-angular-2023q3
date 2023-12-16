import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {getCookie} from "../../shared/functions/get-cookie";

@Injectable({
  providedIn: 'root'
})
export class ThemeToggleService {
  private localeTheme: boolean = getCookie('colorTheme') === 'dark';
  private darkTheme = new BehaviorSubject<boolean>(this.localeTheme);
  isDarkTheme = this.darkTheme.asObservable();

  toggleTheme() {
    const newThemeValue = !this.darkTheme.value;
    this.darkTheme.next(newThemeValue);
    document.cookie = `colorTheme=${newThemeValue ? 'dark' : 'light'}`;
  }
}
