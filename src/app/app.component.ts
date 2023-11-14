import { Component } from '@angular/core';
import {selectFavoriteItems} from "./redux/selectors/favorite.selector";
import {Store} from "@ngrx/store";
import {AppState} from "./redux/interfaces/app-store.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';

  constructor(private store: Store<AppState>) {
    this.store.select(selectFavoriteItems).subscribe((state) => {
      console.log(state);
    });
  }
}
