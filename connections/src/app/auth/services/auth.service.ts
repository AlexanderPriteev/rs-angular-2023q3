/* eslint-disable class-methods-use-this */

import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {getCookie} from "../../shared/functions/get-cookie";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  setData(token: string, uid: string, email: string):void {
    document.cookie = `token=${token}`;
    document.cookie = `uid=${uid}`;
    document.cookie = `email=${email}`;
  }

  setToken(token: string):void {
    document.cookie = `token=${token}`;
  }

  setUid(uid: string):void {
    document.cookie = `uid=${uid}`;
  }

  setEmail(email: string):void {
    document.cookie = `token=${email}`;
  }

  getToken(): string {
    return getCookie('token');
  }

  getUid(): string {
    return getCookie('uid');
  }

  getEmail(): string {
    return getCookie('email');
  }
  getHeader(): HttpHeaders {
    return new HttpHeaders({
      'rs-uid': this.getUid(),
      'rs-email': this.getEmail(),
      Authorization: `Bearer ${this.getToken()}`
    });
  }

  clear():void {
    document.cookie = `token=`;
    document.cookie = `uid=`;
    document.cookie = `email=`;
  }
}
