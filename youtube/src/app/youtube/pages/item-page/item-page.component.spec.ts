import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture, fakeAsync, TestBed, tick, waitForAsync
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { favoriteReducer } from '../../../redux/reducers/favorite.reducer';
import { testItem } from '../../companents/search-item/search-item.component.spec';
import { ISearchResults } from '../../interfaces/search-result.interface';
import { YoutubeModule } from '../../modules/youtube.module';
import { ResultsService } from '../../services/results.service';
import { ItemPageComponent } from './item-page.component';

export const testResults: ISearchResults = {
  kind: 'youtube#searchList',
  etag: 'etag',
  pageInfo: {
    totalResults: 1,
    resultsPerPage: 1,
  },
  items: [testItem],
};

describe('ItemPageComponent', () => {
  let component: ItemPageComponent;
  let fixture: ComponentFixture<ItemPageComponent>;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItemPageComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        YoutubeModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('favorites', favoriteReducer),
      ],
      providers: [
        {
          provide: ResultsService,
          useValue: {
            getItemById: jest.fn().mockReturnValue(of(testResults)),
          },
        },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ItemPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
  }));

  it('should create', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(component).toBeTruthy();
  }));

  it('should update item and format publishedAt when data is present', fakeAsync(() => {
    const dateFormatSpy = jest.spyOn(component, 'dateFormat');
    jest.spyOn(store, 'select').mockReturnValue(of(testItem));

    fixture.detectChanges();
    tick();

    expect(dateFormatSpy).toBeCalled();
  }));

  it('should navigate to not-found', () => {
    const navigateSpy = jest.spyOn(component.router, 'navigate');
    component.toNotFound();
    expect(navigateSpy).toHaveBeenCalledWith(['/not-found']);
  });
});
