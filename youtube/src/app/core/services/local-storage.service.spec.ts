import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { addToFavorites } from '../../redux/actions/favorite.actions';
import { testItem } from '../../youtube/companents/search-item/search-item.component.spec';
import { ISearchItem } from '../../youtube/interfaces/search-item.interface';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})]
    });
    service = TestBed.inject(LocalStorageService);
    store = TestBed.inject(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should dispatch addToFavorites action for item in localStorage', () => {
    const testData: ISearchItem[] = [testItem];
    const getItemMock = jest.fn().mockReturnValue(JSON.stringify(testData));
    Object.defineProperty(window, 'localStorage', { value: { getItem: getItemMock } });
    service.initStoreFromLocalStorage();
    expect(store.dispatch).toHaveBeenCalledTimes(testData.length);
    expect(store.dispatch).toHaveBeenCalledWith(addToFavorites({ searchItem: testData[0] }));
  });
});
