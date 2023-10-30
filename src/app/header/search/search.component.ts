import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchTerm: string = '';
  constructor(private searchService: SearchService) {}

  onSearch() {
    const searchData = this.searchTerm || 'ALL';
    this.searchService.triggerSearch(searchData);
  }
}
