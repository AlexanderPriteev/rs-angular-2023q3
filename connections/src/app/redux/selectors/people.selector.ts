import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IPeopleItem } from '../interfaces/items';
import { AppState } from '../interfaces/state';

const peopleGroups = createFeatureSelector<AppState, IPeopleItem[]>('people');

export const selectPeople = createSelector(peopleGroups, (state) => state);
