import { Component } from '@angular/core';
import { SearchResultService } from './search-result.service';

import { ISearchResults } from './search-result.interface';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  searchResults: ISearchResults | undefined;

  constructor(private searchService: SearchResultService) {}

  ngOnInit(): void {
    this.searchService.getSearchResults().then((data) => {
      this.searchResults = data;
    });
  }
}
