import { createReducer, on } from '@ngrx/store';

import { clearProfile, setProfile, updateProfile } from '../actions/profile.action';
import { IProfileState } from '../interfaces/profile';

const mockProfile = {
  email: '',
  name: '',
  uid: '',
  createdAt: ''
};

export const profileState: IProfileState = { ...mockProfile };

export const profileReducer = createReducer(
  profileState,
  on(setProfile, (state, { profile }) => ({ ...state, ...profile })),
  on(updateProfile, (state, { name }) => ({ ...state, name })),
  on(clearProfile, () => ({ ...mockProfile }))
);
