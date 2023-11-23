import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {Router} from "@angular/router";
import {LoggerService} from "../../core/services/logger/logger.service";

describe('LoginService', () => {
  const username = 'testUser';
  const password = 'testPassword';

  let service: LoginService;
  let routerMock: { navigate: jest.Mock };
  let loggerMock: { logMessage: jest.Mock };

  beforeEach(() => {
    routerMock = { navigate: jest.fn() };
    loggerMock = { logMessage: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: LoggerService, useValue: loggerMock },
        LoginService,
      ],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user', () => {

    service.login(username, password);
    expect(localStorage.getItem(service['authTokenKey'])).toBe(`${username}:${password}`);
    expect(loggerMock.logMessage).toHaveBeenCalledWith(`${username} has logged in.`);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    expect(service['currentUser'].value).toBe(username);
  });

  it('should logout user', () => {
    service['currentUser'].next('test');
    service.logout();
    expect(localStorage.getItem(service['authTokenKey'])).toBeNull();
    expect(loggerMock.logMessage).toHaveBeenCalledWith(`${username} has logged out.`);
    expect(service['currentUser'].value).toBe('');
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should check if user is logged in', () => {
    service['currentUser'].next('test');
    expect(service.isLoggedIn()).toBe(true);
    service['currentUser'].next('');
    expect(service.isLoggedIn()).toBe(false);
  });
});
