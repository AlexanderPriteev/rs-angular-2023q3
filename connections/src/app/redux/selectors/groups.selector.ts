import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IGroupItem } from '../interfaces/items';
import { AppState } from '../interfaces/state';

const getGroups = createFeatureSelector<AppState, IGroupItem[]>('groups');

export const selectGroups = createSelector(getGroups, (state) => state);
