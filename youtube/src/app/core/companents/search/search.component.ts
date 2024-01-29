import { Component } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchTerm = '';
  searchItem = new Subject<string>();

  constructor(private searchService: SearchService) {
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchItem
      .pipe(debounceTime(500))
      .subscribe((value) => {
        if (value.length > 2) {
          this.searchService.triggerSearch(value);
        }
      });
  }

  onSearch(): void {
    this.searchItem.next(this.searchTerm);
  }
}
