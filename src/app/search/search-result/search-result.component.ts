import { Component, Input } from '@angular/core';
import { ISearchResults } from './search-result.interface';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  @Input() searchResults = {} as ISearchResults;
}
