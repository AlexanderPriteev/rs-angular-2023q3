import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppRoutesModule } from '../../../core/modules/routes.module';
import { addToFavorites, removeFromFavorites } from '../../../redux/actions/favorite.actions';
import { selectFavoriteItems } from '../../../redux/selectors/favorite.selector';
import { ButtonModule } from '../../../shared/modules/button.module';
import { AgeColorDirective } from '../../directives/age-color.directive';
import { ISearchItem } from '../../interfaces/search-item.interface';
import { SearchItemComponent } from './search-item.component';

export const testItem: ISearchItem = {
  kind: 'youtube#video',
  etag: 'etag',
  id: {
    kind: 'kind',
    videoId: 'videoId'
  },
  snippet: {
    title: 'title',
    description: 'description',
    publishedAt: '2019-05-30T12:42:19.000Z',
    publishedTime: '2019-05-30T12:42:19.000Z',
    tags: ['tags'],
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/YN8zNnV0sK8/default.jpg',
      },
      medium: {
        url: 'https://i.ytimg.com/vi/YN8zNnV0sK8/default.jpg',
      },
      high: {
        url: 'https://i.ytimg.com/vi/YN8zNnV0sK8/default.jpg',
      },
    },
    categoryId: 'categoryId',
    channelTitle: 'channelTitle',
    liveBroadcastContent: 'none',
  },
  statistics: {
    viewCount: '1500000000',
    likeCount: '23000',
    commentCount: '5000000',
  }
} as ISearchItem;

describe('SearchItemComponent', () => {
  let component: SearchItemComponent;
  let fixture: ComponentFixture<SearchItemComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchItemComponent, AgeColorDirective],
      imports: [ButtonModule, AppRoutesModule, StoreModule.forRoot({})],
      providers: [provideMockStore()],
    });
    fixture = TestBed.createComponent(SearchItemComponent);
    component = fixture.componentInstance;
    component.searchItem = testItem;
    store = TestBed.inject(Store) as MockStore;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call transformStatistics and updateIsFavorite', () => {
    const transformStatisticsSpy = jest.spyOn(component, 'transformStatistics')
      .mockImplementation(() => null);
    const updateIsFavoriteSpy = jest.spyOn(component, 'updateIsFavorite')
      .mockImplementation(() => null);

    const item = testItem;
    const updateItem = { ...testItem, id: { ...testItem.id, videoId: 'newId' } };
    const changes = {
      searchItem: new SimpleChange(item, updateItem, false),
    };

    component.ngOnChanges(changes);
    expect(transformStatisticsSpy).toHaveBeenCalled();
    expect(updateIsFavoriteSpy).toHaveBeenCalled();
  });

  it('should dispatch addToFavorites is true', () => {
    component.isFavorite = false;
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const action = addToFavorites({ searchItem: component.searchItem });

    component.toggleFavorite();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
    expect(component.isFavorite).toBeTruthy();
  });

  it('should dispatch addToFavorites is false', () => {
    component.isFavorite = true;
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const action = removeFromFavorites({ videoId: component.searchItem.id.videoId });

    component.toggleFavorite();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
    expect(component.isFavorite).toBeFalsy();
  });

  it('should update isFavorite correctly', () => {
    store.overrideSelector(selectFavoriteItems, [testItem]);
    component.updateIsFavorite();
    expect(component.isFavorite).toBeTruthy();
  });

  it('should transformStatistics correctly', () => {
    component.searchItem = testItem;
    const transformedStatistics = component.transformStatistics();
    expect(transformedStatistics).toEqual({
      viewCount: '1B',
      likeCount: '23K',
      commentCount: '5M',
    });
  });
  it('should transformStatistics empty', () => {
    component.searchItem = { ...testItem };
    delete component.searchItem.statistics;
    const transformedStatistics = component.transformStatistics();
    expect(transformedStatistics).toBeNull();
  });
});
