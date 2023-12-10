import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { profileReducer } from '../reducers/profile.reducer';
import {groupsReducer} from "../reducers/groups.reducer";
import {peopleReducer} from "../reducers/people.reducer";

@NgModule({
  imports: [
    StoreModule.forRoot({
      profile: profileReducer,
      groups: groupsReducer,
      people: peopleReducer
    })
  ],
  exports: [
    StoreModule
  ]
})
export class ReduxModule { }
