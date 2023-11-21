import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ButtonModule } from '../../../shared/modules/button.module';
import { CreateCardComponent } from './create-card.component';

describe('CreateCardComponent', () => {
  let component: CreateCardComponent;
  let fixture: ComponentFixture<CreateCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCardComponent],
      imports: [ReactiveFormsModule, ButtonModule, StoreModule.forRoot({})]
    });
    fixture = TestBed.createComponent(CreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
