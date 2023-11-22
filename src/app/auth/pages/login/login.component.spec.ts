import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '../../../shared/modules/button.module';
import { LoginComponent } from './login.component';
import {LoginService} from "../../services/login.service";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, ButtonModule],
      providers: [LoginService],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should call with correct credentials', () => {
    const name = 'test@example.com';
    const pass = 'TestPassword123№%';
    const loginSpy = jest.spyOn(TestBed.inject(LoginService), 'login')
      .mockImplementation(() => null);

    component.loginForm.setValue({
      username: name,
      password: pass,
    });

    component.login();
    expect(loginSpy).toHaveBeenCalledWith(name, pass);
  });

  it('should call with empty credentials', () => {
    component.loginForm.setValue({
      username: '',
      password: '',
    });
    component.login();
    fixture.detectChanges();
    const errorElements = fixture.nativeElement.querySelectorAll('.field__error') as HTMLElement[];
    expect(errorElements.length).toEqual(2);
    expect(errorElements[0].textContent).toContain('Please enter a login email');
    expect(errorElements[1].textContent).toContain('Your password isn\'t strong enough');
  });
  it('should call with invalid email credentials', () => {
    component.loginForm.setValue({
      username: '122435',
      password: 'TestPassword123№%',
    });
    component.login();
    fixture.detectChanges();
    const errorElements = fixture.nativeElement.querySelector('.field__error') as HTMLElement;
    expect(errorElements.textContent).toContain('The login email is invalid');
  });
});
