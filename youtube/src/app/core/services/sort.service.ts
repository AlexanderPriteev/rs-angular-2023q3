import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  private sortTrigger = new BehaviorSubject<(string | boolean)[]>([]);
  private filterTrigger = new BehaviorSubject<string>('');
  private sort = {
    date: true,
    count: true
  };
  sortTrigger$ = this.sortTrigger.asObservable();
  filterTrigger$ = this.filterTrigger.asObservable();

  triggerSort(data: 'date' | 'count') {
    this.sortTrigger.next([data, this.sort[data]]);
    this.sort[data] = !this.sort[data];
  }
  triggerFilter(data: string) {
    this.filterTrigger.next(data);
  }
}
