import { Component } from '@angular/core';

import { SortService } from './sort.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent {
  constructor(private sortService: SortService) {}
  onSort(data: 'date' | 'count') {
    this.sortService.triggerSort(data);
  }
  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.sortService.triggerFilter(inputValue);
  }
}
