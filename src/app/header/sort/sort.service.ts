import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  private sortTrigger = new BehaviorSubject<(string | boolean)[]>([]);
  private sort = {
    date: true,
    count: true
  };
  sortTrigger$ = this.sortTrigger.asObservable();

  triggerSort(data: 'date' | 'count') {
    this.sortTrigger.next([data, this.sort[data]]);
    this.sort[data] = !this.sort[data];
  }
}
