import { createReducer, on } from '@ngrx/store';

import { ISearchItem } from '../../youtube/interfaces/search-item.interface';
import { addNewToFavorites, addToFavorites, removeFromFavorites } from '../actions/favorite.actions';

export const initialState: ISearchItem[] = [];

export const favoriteReducer = createReducer(
  initialState,
  on(addToFavorites, (state, { searchItem }) => [...state, searchItem]),
  on(addNewToFavorites, (state, { searchItem }) => [searchItem, ...state].sort((a:ISearchItem, b: ISearchItem) => {
    if (a.kind !== 'newItem') return 1;
    if (b.kind !== 'newItem') return -1;
    return new Date(a.snippet.publishedTime).getTime() - new Date(a.snippet.publishedTime).getTime();
  })),
  on(removeFromFavorites, (state, { videoId }) => state.filter((item) => item.id.videoId !== videoId))
);
