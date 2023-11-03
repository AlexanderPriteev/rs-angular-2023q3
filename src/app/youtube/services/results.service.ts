import { Injectable } from '@angular/core';

import { ISearchItem } from '../interfaces/search-item.interface';
import { ISearchResults } from '../interfaces/search-result.interface';
import * as responseData from '../pages/search-result/response.json';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private data: ISearchResults = responseData;

  getItemById(id: string): Promise<ISearchItem | null> {
    return new Promise((resolve) => {
      const foundItem = this.data.items.find((item) => item.id === id);
      resolve(foundItem || null);
    });
  }

  getSearchResults(): Promise<ISearchResults> {
    return new Promise((resolve) => {
      resolve(this.data);
    });
  }
}
