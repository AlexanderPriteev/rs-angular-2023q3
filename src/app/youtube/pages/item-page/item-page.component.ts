import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';

import { ISearchItem } from '../../interfaces/search-item.interface';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {
  item!: ISearchItem;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resultService: ResultsService
  ) {}

  toNotFound() {
    this.router.navigate(['/not-found']);
  }
  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const { id } = params;
      try {
        const data: ISearchItem | null = await this.resultService.getItemById(id);
        if (data) {
          this.item = data;
          this.item.snippet.publishedAt = format(new Date(this.item.snippet.publishedAt), 'EEEE, MMMM dd, yyyy');
        } else this.toNotFound();
      } catch {
        this.toNotFound();
      }
    });
  }
}
