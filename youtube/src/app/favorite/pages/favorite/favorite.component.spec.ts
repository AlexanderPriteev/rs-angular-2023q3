import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { favoriteReducer } from '../../../redux/reducers/favorite.reducer';
import { testItem } from '../../../youtube/companents/search-item/search-item.component.spec';
import { YoutubeModule } from '../../../youtube/modules/youtube.module';
import { FavoriteComponent } from './favorite.component';

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteComponent],
      imports: [
        YoutubeModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('favorites', favoriteReducer),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;
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
