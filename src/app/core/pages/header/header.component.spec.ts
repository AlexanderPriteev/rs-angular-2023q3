import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '../../modules/core.module';
import { HeaderComponent } from './header.component';
import {NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [CoreModule]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial values on ngOnInit', () => {
    const router = TestBed.inject(Router);
    const navigationEndEvent = new NavigationEnd(1, '/', '/');

    (router.events as BehaviorSubject<NavigationEnd>).next(navigationEndEvent);
    fixture.detectChanges();

    expect(component.currentURL).toEqual('/');
    expect(component.isMainRoute).toBeTruthy();
  });

  it('should toggle isSortVisible', () => {
    const initialValue = component.isSortVisible;
    component.toggleSort();
    fixture.detectChanges();
    expect(component.isSortVisible).toEqual(!initialValue);
  });
});
