import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import {ILogin, IRegistration} from '../../auth/interfaces/auth';

const PATH = 'https://tasks.app.rs.school/angular/'

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  constructor(private http: HttpClient) {}

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
}
