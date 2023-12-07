import { Injectable } from '@angular/core';
import {IHeader} from "../../api/interfaces/interfaces";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  setData(token: string, uid: string, email: string):void{
    localStorage.setItem('token', token);
    localStorage.setItem('uid', uid);
    localStorage.setItem('email', email);
  }

  setToken(token: string):void {
    localStorage.setItem('token', token);
  }

  setUid(uid: string):void {
    localStorage.setItem('uid', uid);
  }

  setEmail(email: string):void {
    localStorage.setItem('email', email);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getUid(): string {
    return localStorage.getItem('uid') || '';
  }

  getEmail(): string {
    return localStorage.getItem('email') || '';
  }
  getHeader(): HttpHeaders {
    return new HttpHeaders({
      'rs-uid': this.getUid(),
      'rs-email': this.getEmail(),
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  clear():void{
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('email');
  }
}
