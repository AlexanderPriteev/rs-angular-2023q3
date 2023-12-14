import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_KEY, API_URL } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptor {
  private token = API_KEY;
  private url = API_URL;
  intercept<T>(req: HttpRequest<T>, next: HttpHandler) {
    const newReq = req.clone({
      params: req.params.set('key', this.token),
      url: `${this.url}${req.url}`,
    });
    return next.handle(newReq);
  }
}
