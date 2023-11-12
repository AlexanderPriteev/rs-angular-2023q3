import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  forkJoin, mergeMap, Observable, of
} from 'rxjs';

import { API_KEY, API_URL } from '../../api/api-config';
import { ISearchResults } from '../interfaces/search-result.interface';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private apiUrlSearch = `${API_URL}search`;
  private apiUrlItem = `${API_URL}videos`;
  private maxItems = 50;

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
      .set('key', API_KEY)
      .set('part', 'snippet,statistics')
      .set('id', id);
    return this.http.get<ISearchResults>(this.apiUrlItem, { params });
  }

  getSearchResults(query: string): Observable<ISearchResults> {
    const params = new HttpParams()
      .set('key', API_KEY)
      .set('part', 'snippet')
      .set('type', 'video')
      .set('q', query)
      .set('maxResults', String(this.maxItems));

    return this.http.get<ISearchResults>(this.apiUrlSearch, { params }).pipe(
      mergeMap((result: ISearchResults) => this.getMergeMap(result))
    );
  }
}
