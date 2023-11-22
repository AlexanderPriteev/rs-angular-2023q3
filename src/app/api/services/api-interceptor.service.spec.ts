import { TestBed } from '@angular/core/testing';
import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { ApiInterceptor } from './api-interceptor.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {API_KEY, API_URL} from "../api-config";

describe('ApiInterceptor', () => {
  let interceptor: ApiInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiInterceptor],
    });
    interceptor = TestBed.inject(ApiInterceptor);
  });

  it('should add the API key and update the URL', () => {
    let url: string | null = null;
    let key: string | null = null;
    const LINK = 'test';
    const requestMock = new HttpRequest('GET', LINK);
    const next: HttpHandler = {
      handle: jest.fn((req: HttpRequest<null>) => {
        url = req.url;
        key = req.params.get('key');
        return of(new HttpResponse());
      }),
    };

    interceptor.intercept(requestMock, next).subscribe();

    expect(key).toEqual(API_KEY);
    expect(url).toEqual(`${API_URL}${LINK}`);
  });

});
