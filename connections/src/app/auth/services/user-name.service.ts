import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserNameService {
  private localUserName: string = localStorage.getItem('email') || '';
  private name = new BehaviorSubject<string>(this.localUserName);
  userName = this.name.asObservable();

  setUserName(email: string) {
    this.name.next(email);
    localStorage.setItem('email', email);
  }
}
