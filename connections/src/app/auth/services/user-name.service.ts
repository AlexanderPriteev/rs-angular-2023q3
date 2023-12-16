import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {getCookie} from "../../shared/functions/get-cookie";

@Injectable({
  providedIn: 'root'
})
export class UserNameService {
  private localUserName: string = getCookie('email');
  private name = new BehaviorSubject<string>(this.localUserName);
  userName = this.name.asObservable();

  setUserName(email: string) {
    this.name.next(email);
    document.cookie= `email=${email}`;
  }
}
