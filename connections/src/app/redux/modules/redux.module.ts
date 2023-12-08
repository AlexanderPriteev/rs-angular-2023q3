import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { profileReducer } from '../reducers/profile.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({ profile: profileReducer })
  ],
  exports: [
    StoreModule
  ]
})
export class ReduxModule { }
