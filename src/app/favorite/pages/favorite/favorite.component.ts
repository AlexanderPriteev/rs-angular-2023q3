import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../redux/interfaces/app-store.interface';
import { selectFavoriteItems } from '../../../redux/selectors/favorite.selector';
import { ISearchItem } from '../../../youtube/interfaces/search-item.interface';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  private maxItemsOnPage = 2;
  paginationNumber: number[] = [];
  currentPage = 1;
  favoriteList: ISearchItem[] = [] as ISearchItem[];
  favoritePage: ISearchItem[] = [] as ISearchItem[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectFavoriteItems).subscribe((state) => {
      this.favoriteList = state;
      this.currentPage = 1;
      this.favoritePage = state.slice(0, this.maxItemsOnPage);
      this.paginationNumber = new Array(Math.ceil(state.length / this.maxItemsOnPage))
        .fill(0)
        .map((_, i) => i + 1);
    });
  }

  goToPage(index: number) {
    this.favoritePage = [...this.favoriteList]
      .slice((index - 1) * this.maxItemsOnPage, index * this.maxItemsOnPage);
    this.currentPage = index;
  }
}
