import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { format } from 'date-fns';

import { AppState } from '../../../redux/interfaces/app-store.interface';
import { selectItemById } from '../../../redux/selectors/favorite.selector';
import { ISearchItem } from '../../interfaces/search-item.interface';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {
  item!: ISearchItem;
  prevRoute = '/';

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public resultService: ResultsService,
    private store: Store<AppState>,
    private ngZone: NgZone
  ) {}

  toNotFound() {
    this.ngZone.run(() => {
      this.router.navigate(['/not-found']);
    });
  }

  dateFormat() {
    return format(new Date(this.item.snippet.publishedAt), 'EEEE, MMMM dd, yyyy');
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      const { id, prevRoute } = params;
      this.prevRoute = prevRoute || '/';

      try {
        const storedItem = this.store.select(selectItemById(id));
        storedItem.subscribe((data) => {
          if (data) {
            this.item = { ...data };
            this.item.snippet = { ...this.item.snippet, publishedAt: this.dateFormat() };
          }
        });
        if (!this.item) {
          const data = await this.resultService.getItemById(id).toPromise();
          if (data) {
            [this.item] = data.items;
            this.item.snippet.publishedAt = this.dateFormat();
          } else {
            this.toNotFound();
          }
        }
      } catch {
        this.toNotFound();
      }
    });
  }
}
