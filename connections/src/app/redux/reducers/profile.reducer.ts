import { createReducer, on } from '@ngrx/store';

import { setProfile, updateProfile } from '../actions/profile.action';
import { IProfileState } from '../interfaces/profile';

export const profileState: IProfileState = {
  email: '',
  name: '',
  uid: '',
  createdAt: '',
};

export const profileReducer = createReducer(
  profileState,
  on(setProfile, (state, { profile }) => ({ ...state, ...profile })),
  on(updateProfile, (state, { name }) => ({ ...state, name }))
);
