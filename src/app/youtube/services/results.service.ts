import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  forkJoin, mergeMap, Observable, of
} from 'rxjs';

import { ISearchResults } from '../interfaces/search-result.interface';
import {MAX_ITEMS} from "../../api/api-config";

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private apiUrlSearch = 'search';
  private apiUrlItem = 'videos';
  private maxItems = MAX_ITEMS;

  constructor(private http: HttpClient) {}

  private getMergeMap(searchResults: ISearchResults) {
    const videoObservables: Observable<ISearchResults>[] = [];
    searchResults.items.forEach((item) => {
      videoObservables.push(this.getItemById(item.id.videoId));
    });
    return forkJoin(videoObservables).pipe(
      mergeMap((videoStats: ISearchResults[]) => {
        const updateItems = { ...searchResults };
        updateItems.items = searchResults.items.map((e, i) => (
          { ...e, statistics: videoStats[i].items[0].statistics }));
        return of(updateItems);
      })
    );
  }

  getItemById(id: string): Observable<ISearchResults> {
    const params = new HttpParams()
      .set('part', 'snippet,statistics')
      .set('id', id);
    return this.http.get<ISearchResults>(this.apiUrlItem, { params });
  }

  getSearchResults(query: string): Observable<ISearchResults> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('type', 'video')
      .set('q', query)
      .set('maxResults', String(this.maxItems));

    return this.http.get<ISearchResults>(this.apiUrlSearch, { params }).pipe(
      mergeMap((result: ISearchResults) => this.getMergeMap(result))
    );
  }
}
