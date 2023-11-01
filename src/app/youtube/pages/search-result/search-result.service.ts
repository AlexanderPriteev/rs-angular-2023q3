import { Injectable } from '@angular/core';

import * as responseData from './response.json';
import { ISearchResults } from './search-result.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchResultService {
  private data: ISearchResults = responseData;

  getSearchResults(): Promise<ISearchResults> {
    return new Promise((resolve) => {
      resolve(this.data);
    });
  }
}
