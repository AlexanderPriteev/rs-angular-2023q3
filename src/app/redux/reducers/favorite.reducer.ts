import { createReducer, on } from '@ngrx/store';
import {ISearchItem} from "../../youtube/interfaces/search-item.interface";
import {addToFavorites, removeFromFavorites} from "../actions/favorite.actions";


export const initialState: ISearchItem[] = [];

export const favoriteReducer = createReducer(
  initialState,
  on(addToFavorites, (state, { searchItem }) => [...state, searchItem]),
  on(removeFromFavorites, (state, { videoId }) =>
    state.filter((item) => item.id.videoId !== videoId)
  )
);
