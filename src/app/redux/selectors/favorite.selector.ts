import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "../interfaces/app-store.interface";
import {ISearchItem} from "../../youtube/interfaces/search-item.interface";

const getFavoriteState = createFeatureSelector<AppState, ISearchItem[]>('favorites');
export const selectFavoriteItems = createSelector(getFavoriteState, (state) => state);
