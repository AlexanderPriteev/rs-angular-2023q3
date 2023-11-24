import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';

import { favoriteReducer } from '../../../redux/reducers/favorite.reducer';
import { ButtonModule } from '../../../shared/modules/button.module';
import { CreateCardComponent } from './create-card.component';

describe('CreateCardComponent', () => {
  let component: CreateCardComponent;
  let fixture: ComponentFixture<CreateCardComponent>;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCardComponent],
      imports: [
        ReactiveFormsModule,
        ButtonModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('favorites', favoriteReducer),
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CreateCardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
