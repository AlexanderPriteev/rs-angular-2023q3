import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTrigger = new BehaviorSubject<string>('');
  searchTrigger$ = this.searchTrigger.asObservable();

  triggerSearch(data: string) {
    this.searchTrigger.next(data);
  }
}
