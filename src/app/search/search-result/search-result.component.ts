import { Component } from '@angular/core';
import { SearchResultService } from './search-result.service';

import { ISearchResults } from './search-result.interface';
import {SearchService} from "../../header/search/search.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  searchResults: ISearchResults | undefined;

  constructor(
    private searchService: SearchService,
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
  }
}
