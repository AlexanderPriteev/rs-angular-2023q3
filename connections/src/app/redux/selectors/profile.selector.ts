import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IProfileState } from '../interfaces/profile';
import { AppState } from '../interfaces/state';

const getProfile = createFeatureSelector<AppState, IProfileState>('profile');

export const selectProfile = createSelector(getProfile, (state) => state);
