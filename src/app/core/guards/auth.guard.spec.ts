import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginService } from '../../auth/services/login.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => TestBed
    .runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
  it('should return true if user is logged in', () => {
    const mockLoginService = TestBed.inject(LoginService);
    jest.spyOn(mockLoginService, 'isLoggedIn').mockReturnValue(true);
    const result = executeGuard(null!, null!);
    expect(result).toBe(true);
  });

  it('should navigate to login page for unauthorized user', () => {
    const mockRouter = TestBed.inject(Router);
    const mockLoginService = TestBed.inject(LoginService);
    const spy = jest.spyOn(mockRouter, 'navigate');
    jest.spyOn(mockLoginService, 'isLoggedIn').mockReturnValue(false);
    const result = executeGuard(null!, null!);
    expect(result).toBe(false);
    expect(spy).toHaveBeenCalledWith(['/login']);
  });
});
