import { Component, OnInit } from '@angular/core';

import { SearchService } from '../../header/search/search.service';
import { SortService } from '../../header/sort/sort.service';
import { ISearchResults } from './search-result.interface';
import { SearchResultService } from './search-result.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  searchResults: ISearchResults | undefined;
  filterTerm = '';

  constructor(
    private searchService: SearchService,
    private sortService: SortService,
    private searchResultService: SearchResultService
  ) {}

  ngOnInit(): void {
    this.searchService.searchTrigger$.subscribe((searchTriggered) => {
      if (searchTriggered) {
        this.searchResultService.getSearchResults().then((data) => {
          this.searchResults = data;
        });
      }
    });

    this.sortService.sortTrigger$.subscribe((sortTrigger) => {
      if (!this.searchResults) return;
      this.searchResults.items.sort((a, b) => {
        let first: number;
        let second: number;
        switch (sortTrigger[0]) {
          case 'date':
            first = new Date(a.snippet.publishedAt).getTime();
            second = new Date(b.snippet.publishedAt).getTime();
            break;
          case 'count':
            [first, second] = [+a.statistics.viewCount, +b.statistics.viewCount];
            break;
          default: [first, second] = [0, 0];
        }
        return sortTrigger[1] ? first - second : second - first;
      });
    });

    this.sortService.filterTrigger$.subscribe((filterTrigger) => {
      this.filterTerm = filterTrigger;
    });
  }
}
