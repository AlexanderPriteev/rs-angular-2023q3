import { Component, OnInit } from '@angular/core';

import { SearchService } from '../../../core/services/search.service';
import { SortService } from '../../../core/services/sort.service';
import { ISearchResults } from '../../interfaces/search-result.interface';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  searchResults: ISearchResults | null = null;
  filterTerm = '';

  constructor(
    private searchService: SearchService,
    private sortService: SortService,
    private searchResultService: ResultsService
  ) {}

  dataSort(sortTrigger: Array<string | boolean>): void {
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
          if (a.statistics && b.statistics) {
            [first, second] = [Number(a.statistics.viewCount), Number(b.statistics.viewCount)];
          } else {
            [first, second] = [0, 0];
          }
          break;
        default: [first, second] = [0, 0];
      }
      return sortTrigger[1] ? first - second : second - first;
    });
  }

  ngOnInit(): void {
    this.searchService.searchTrigger$.subscribe((searchTriggered) => {
      if (searchTriggered) {
        this.searchResultService.getSearchResults(searchTriggered).subscribe((data) => {
          this.searchResults = data;
        });
      }
    });

    this.sortService.sortTrigger$.subscribe((sortTrigger) => {
      this.dataSort(sortTrigger);
    });

    this.sortService.filterTrigger$.subscribe((filterTrigger) => {
      this.filterTerm = filterTrigger;
    });
  }
}
