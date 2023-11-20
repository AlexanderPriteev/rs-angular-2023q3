import {
  Component, Input, OnChanges, SimpleChanges
} from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { addToFavorites, removeFromFavorites } from '../../../redux/actions/favorite.actions';
import { AppState } from '../../../redux/interfaces/app-store.interface';
import { selectFavoriteItems } from '../../../redux/selectors/favorite.selector';
import { IItemStatistics, ISearchItem } from '../../interfaces/search-item.interface';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnChanges {
  @Input() searchItem: ISearchItem = {} as ISearchItem;
  formatStatistics: IItemStatistics | null = null;
  isFavorite = false;
  isYoutubeVideo = false;
  currenRoute = this.router.url;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchItem']) {
      this.formatStatistics = this.transformStatistics();
      this.isYoutubeVideo = this.searchItem.kind !== 'newItem';
      this.updateIsFavorite();
    }
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.store.dispatch(removeFromFavorites({ videoId: this.searchItem.id.videoId }));
      this.isFavorite = false;
    } else {
      this.store.dispatch(addToFavorites({ searchItem: this.searchItem }));
      this.isFavorite = true;
    }
  }

  private updateIsFavorite(): void {
    this.store.pipe(select(selectFavoriteItems)).subscribe((favoriteList: ISearchItem[]) => {
      this.isFavorite = favoriteList.some((item) => item.id.videoId === this.searchItem.id.videoId);
    });
  }

  private transformStatistics(): IItemStatistics | null {
    if (!this.searchItem.statistics) return null;
    const tmpStatistics: IItemStatistics = { ...this.searchItem.statistics };
    (Object.entries(this.searchItem.statistics) as string[][]).forEach(([key, value]) => {
      const suffixes = ['K', 'M', 'B'];
      let [newValue, suffix] = [Number(value), ''];
      suffixes.forEach((suf) => {
        const tmp = Math.floor(newValue / 1000);
        if (tmp > 0) [newValue, suffix] = [tmp, suf];
      });
      tmpStatistics[key as keyof IItemStatistics] = `${newValue}${suffix}`;
    });
    return tmpStatistics;
  }
}
