import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { IRegistration } from '../../auth/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {
  private registrationUrl = 'https://tasks.app.rs.school/angular/registration';

  constructor(private http: HttpClient) {}

  signUp(formData: IRegistration) {
    return this.http.post(this.registrationUrl, JSON.parse(JSON.stringify(formData))).pipe(
      catchError((error) => throwError(error))
    );
  }
}
