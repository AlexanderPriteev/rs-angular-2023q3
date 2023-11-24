import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { favoriteReducer } from '../../../redux/reducers/favorite.reducer';
import { testItem } from '../../../youtube/companents/search-item/search-item.component.spec';
import { FavoriteComponent } from './favorite.component';

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;
  // let store: Store;

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
    // store = TestBed.inject(Store);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update favoritePage and currentPage when goToPage is called', () => {
    const mockLength = 80;
    component.favoriteList = new Array(mockLength).fill(testItem);
    component.goToPage(2);
    expect(component.favoritePage.length).toEqual(20);
    expect(component.currentPage).toEqual(2);
  });
});
