import { Component, Input } from '@angular/core';
import { ISearchItem } from './search-item.interface';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() searchItem = {} as ISearchItem;
}