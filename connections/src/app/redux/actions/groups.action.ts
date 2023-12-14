import { createAction, props } from '@ngrx/store';

import { IGroupItem } from '../interfaces/items';

export const setGroups = createAction(
  '[Groups] Set',
  props<{ groups: IGroupItem[] }>()
);

export const addGroup = createAction(
  '[Groups] Add',
  props<{ group: IGroupItem }>()
);

export const deleteGroup = createAction(
  '[Groups] Delete',
  props<{ groupID: string }>()
);

export const clearGroup = createAction(
  '[Groups] Clear',
);
