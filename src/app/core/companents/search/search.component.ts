import { Component } from '@angular/core';

import { SearchService } from '../../services/search.service';
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchTerm = '';
  private searchItem = new Subject<string>();

  constructor(private searchService: SearchService) {
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchItem
      .pipe(debounceTime(300))
      .subscribe((value) => {
        if(value.length > 2) {
          this.searchService.triggerSearch(value);
        }
      });
  }

  onSearch(): void {
    this.searchItem.next(this.searchTerm)
  }
}
