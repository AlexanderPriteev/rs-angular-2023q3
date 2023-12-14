/* eslint-disable class-methods-use-this */

import { Pipe, PipeTransform } from '@angular/core';
import {
  forkJoin, mergeMap, Observable, of
} from 'rxjs';

import { ISearchResults } from '../interfaces/search-result.interface';

@Pipe({
  name: 'videoStats'
})
export class VideoStatsPipe implements PipeTransform {
  transform(searchResults: ISearchResults, videoObservables: Observable<ISearchResults>[]): Observable<ISearchResults> {
    return forkJoin(videoObservables).pipe(
      mergeMap((videoStats: ISearchResults[]) => {
        const updateItems = { ...searchResults };
        updateItems.items = searchResults.items.map((item, i) => ({
          ...item,
          statistics: videoStats[i].items[0].statistics,
        }));
        return of(updateItems);
      })
    );
  }
}
