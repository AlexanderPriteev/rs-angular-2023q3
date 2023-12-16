import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IDialogState } from '../interfaces/message';
import { AppState } from '../interfaces/state';

const getDialogs = createFeatureSelector<AppState, IDialogState>('dialogs');

export const selectPeopleDialog = (id: string) => createSelector(
  getDialogs,
  (state) => state.people.get(id)
);
export const selectGroupDialog = (id: string) => createSelector(
  getDialogs,
  (state) => state.group.get(id)
);
