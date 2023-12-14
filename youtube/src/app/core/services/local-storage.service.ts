import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { addToFavorites } from '../../redux/actions/favorite.actions';
import { AppState } from '../../redux/interfaces/app-store.interface';
import { ISearchItem } from '../../youtube/interfaces/search-item.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(private store: Store<AppState>) {}

  initStoreFromLocalStorage() {
    const storeData = localStorage.getItem('store');
    if (storeData) {
      const parsedData = JSON.parse(storeData) as ISearchItem[];
      parsedData.forEach((item) => this.store.dispatch(addToFavorites({ searchItem: item })));
    }
  }
}
