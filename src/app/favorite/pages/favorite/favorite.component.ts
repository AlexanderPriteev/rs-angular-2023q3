import {Component, OnInit} from '@angular/core';
import {ISearchItem} from "../../../youtube/interfaces/search-item.interface";
import {selectFavoriteItems} from "../../../redux/selectors/favorite.selector";
import {Store} from "@ngrx/store";
import {AppState} from "../../../redux/interfaces/app-store.interface";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit{
  favoriteList: ISearchItem[] = [] as ISearchItem[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectFavoriteItems).subscribe((state) => {
      this.favoriteList = state;
    });
  }
}
