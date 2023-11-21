import { Component, OnInit } from '@angular/core';
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
    private route: ActivatedRoute,
    private router: Router,
    private resultService: ResultsService,
    private store: Store<AppState>
  ) {}

  toNotFound() {
    this.router.navigate(['/not-found']);
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      const { id, prevRoute } = params;
      this.prevRoute = prevRoute || '/';
      const dateFormat = (date: string) => format(new Date(date), 'EEEE, MMMM dd, yyyy');

      try {
        const storedItem = this.store.select(selectItemById(id));
        storedItem.subscribe((data) => {
          if (data) {
            this.item = { ...data };
            this.item.snippet = { ...this.item.snippet, publishedAt: dateFormat(this.item.snippet.publishedAt) };
          }
        });
        if (!this.item) {
          const data = await this.resultService.getItemById(id).toPromise();
          if (data !== undefined) {
            [this.item] = data.items;
            this.item.snippet.publishedAt = dateFormat(this.item.snippet.publishedAt);
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
