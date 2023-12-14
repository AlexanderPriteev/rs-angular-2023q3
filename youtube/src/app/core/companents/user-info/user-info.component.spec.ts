import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { LoginService } from '../../../auth/services/login.service';
import { AppRoutesModule } from '../../modules/routes.module';
import { UserInfoComponent } from './user-info.component';

class MockLoginService {
  currentUser = new BehaviorSubject<string>('test');
  logout(): void {}
}

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInfoComponent],
      imports: [AppRoutesModule],
      providers: [
        { provide: LoginService, useClass: MockLoginService }
      ]
    });
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginService = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call sortService', () => {
    const triggerLogoutSpy = jest.spyOn(loginService, 'logout');
    component.logout();
    expect(triggerLogoutSpy).toBeCalled();
  });
});
