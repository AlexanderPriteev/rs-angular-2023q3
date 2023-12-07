import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import {ILogin, IRegistration} from '../../auth/interfaces/auth';
import {AuthService} from "../../auth/services/auth.service";

const PATH = 'https://tasks.app.rs.school/angular/'

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  constructor(private http: HttpClient, private auth: AuthService) {}


  signUp(formData: IRegistration) {
    return this.http.post(`${PATH}registration`, JSON.parse(JSON.stringify(formData))).pipe(
      catchError((error) => throwError(error))
    );
  }

  signIn(formData: ILogin) {
    return this.http.post(`${PATH}login`, JSON.parse(JSON.stringify(formData))).pipe(
      catchError((error) => throwError(error))
    );
  }

  logout(){
    return this.http.delete(`${PATH}logout`, {headers: this.auth.getHeader()}).pipe(
      catchError((error) => throwError(error))
    );
  }
}
