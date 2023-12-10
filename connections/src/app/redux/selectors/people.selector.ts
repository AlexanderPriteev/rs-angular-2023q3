import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "../interfaces/state";
import {IPeopleItem} from "../interfaces/items";

const peopleGroups = createFeatureSelector<AppState, IPeopleItem[]>('people');

export const selectPeople  = createSelector(peopleGroups, (state) => state);
