import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';

import { FavoriteComponent } from './favorite.component';
import {favoriteReducer} from "../../../redux/reducers/favorite.reducer";

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteComponent],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('favorites', favoriteReducer),
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
