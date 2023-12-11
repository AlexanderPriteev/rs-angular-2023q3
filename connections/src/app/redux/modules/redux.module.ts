import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { dialogsReducer } from '../reducers/dialogs.reducer';
import { groupsReducer } from '../reducers/groups.reducer';
import { peopleReducer } from '../reducers/people.reducer';
import { profileReducer } from '../reducers/profile.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({
      profile: profileReducer,
      groups: groupsReducer,
      people: peopleReducer,
      dialogs: dialogsReducer
    })
  ],
  exports: [
    StoreModule
  ]
})
export class ReduxModule { }
