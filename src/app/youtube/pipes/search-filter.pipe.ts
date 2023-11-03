/* eslint-disable class-methods-use-this */
import { Pipe, PipeTransform } from '@angular/core';

import { ISearchItem } from '../interfaces/search-item.interface';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(searchItems: ISearchItem[], filterTerm: string): ISearchItem[] {
    if (!searchItems.length || !filterTerm) return searchItems;
    return searchItems.filter((item) => item.snippet.title.toLowerCase().includes(filterTerm.toLowerCase()));
  }
}
