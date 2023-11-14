import { NgModule } from '@angular/core';
import {StoreModule} from "@ngrx/store";
import {favoriteReducer} from "../reducers/favorite.reducer";


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({ favorites: favoriteReducer }),
  ],
  exports: [
    StoreModule
  ]
})
export class AppStoreModule { }
