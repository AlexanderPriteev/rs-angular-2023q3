import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { ILogin, IRegistration } from '../../auth/interfaces/auth';
import { AuthService } from '../../auth/services/auth.service';

const PATH = 'https://tasks.app.rs.school/angular/';

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

  logout() {
    return this.http.delete(`${PATH}logout`, { headers: this.auth.getHeader() }).pipe(
      catchError((error) => throwError(error))
    );
  }

  profile() {
    return this.http.get(`${PATH}profile`, { headers: this.auth.getHeader() }).pipe(
      catchError((error) => throwError(error))
    );
  }

  profileUpdate(name: string) {
    return this.http.put(`${PATH}profile`, { name }, { headers: this.auth.getHeader() }).pipe(
      catchError((error) => throwError(error))
    );
  }

  getGroups() {
    return this.http.get(`${PATH}groups/list`, { headers: this.auth.getHeader() }).pipe(
      catchError((error) => throwError(error))
    );
  }

  createGroup(name: string) {
    return this.http.post(`${PATH}groups/create`, { name }, { headers: this.auth.getHeader() }).pipe(
      catchError((error) => throwError(error))
    );
  }
  deleteGroup(groupID: string) {
    return this.http.delete(
      `${PATH}groups/delete?groupID=${groupID}`,
      { headers: this.auth.getHeader() }
    ).pipe(
      catchError((error) => throwError(error))
    );
  }

  getPeople() {
    return this.http.get(`${PATH}users`, { headers: this.auth.getHeader() }).pipe(
      catchError((error) => throwError(error))
    );
  }

  getGroupByID(groupID: string, since: number = 0) {
    const path = `${PATH}groups/read?groupID=${groupID}${since ? `&since=${since}` : ''}`;
    return this.http.get(path, { headers: this.auth.getHeader() }).pipe(
      catchError((error) => throwError(error))
    );
  }

  getPeopleByID(UID: string, since: number = 0) {
    const path = `${PATH}conversations/read?conversationID=${UID}${since ? `&since=${since}` : ''}`;
    return this.http.get(path, { headers: this.auth.getHeader() }).pipe(
      catchError((error) => throwError(error))
    );
  }

  getConversationList() {
    return this.http.get(`${PATH}conversations/list`, { headers: this.auth.getHeader() }).pipe(
      catchError((error) => throwError(error))
    );
  }

  postConversation(companion: string) {
    return this.http.post(`${PATH}conversations/create`, { companion }, { headers: this.auth.getHeader() }).pipe(
      catchError((error) => throwError(error))
    );
  }

  deleteConversation(conversationID: string) {
    const path = `${PATH}conversations/delete?conversationID=${conversationID}`;
    return this.http.delete(path, { headers: this.auth.getHeader() }).pipe(
      catchError((error) => throwError(error))
    );
  }

  postGroupMessage(groupID: string, message: string) {
    return this.http.post(
      `${PATH}groups/append`,
      { groupID, message },
      { headers: this.auth.getHeader() }
    ).pipe(
      catchError((error) => throwError(error))
    );
  }

  postPeopleMessage(conversationID: string, message: string) {
    return this.http.post(
      `${PATH}conversations/append`,
      { conversationID, message },
      { headers: this.auth.getHeader() }
    ).pipe(
      catchError((error) => throwError(error))
    );
  }
}
