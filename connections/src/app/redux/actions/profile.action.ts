import { createAction, props } from '@ngrx/store';

import { IProfileState } from '../interfaces/profile';

export const setProfile = createAction(
  '[Profile] Set',
  props<{ profile: IProfileState }>()
);
export const updateProfile = createAction(
  '[Profile] Update',
  props<{ name: string }>()
);
export const clearProfile = createAction(
  '[Profile] Update'
);
