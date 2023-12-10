import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "../interfaces/state";
import {IGroupItem} from "../interfaces/items";

const getGroups = createFeatureSelector<AppState, IGroupItem[]>('groups');

export const selectGroups  = createSelector(getGroups, (state) => state);
