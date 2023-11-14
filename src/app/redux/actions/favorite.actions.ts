import { createAction, props } from '@ngrx/store';
import {ISearchItem} from "../../youtube/interfaces/search-item.interface";


export const addToFavorites = createAction(
  '[Favorite] Add',
  props<{ searchItem: ISearchItem }>()
);

export const removeFromFavorites = createAction(
  '[Favorite] Remove',
  props<{ videoId: string }>()
);
