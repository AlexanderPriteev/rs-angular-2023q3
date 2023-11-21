import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ISearchItem } from '../../youtube/interfaces/search-item.interface';
import { AppState } from '../interfaces/app-store.interface';

const getFavoriteState = createFeatureSelector<AppState, ISearchItem[]>('favorites');

export const selectFavoriteItems = createSelector(getFavoriteState, (state) => state);
export const selectItemById = (id: string) => createSelector(
  getFavoriteState,
  (state) => state.find((elem) => elem.id.videoId === id)
);
