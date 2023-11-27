import { testItem } from '../companents/search-item/search-item.component.spec';
import { ISearchItem } from '../interfaces/search-item.interface';
import { SearchFilterPipe } from './search-filter.pipe';

const testResultsPipe = [
  {
    ...testItem,
    snippet: { ...testItem.snippet, title: 'first' }
  },
  {
    ...testItem,
    snippet: { ...testItem.snippet, title: 'second' },
  },
  {
    ...testItem,
    snippet: { ...testItem.snippet, title: 'third' },
  }
] as ISearchItem[];

describe('SearchResultPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchFilterPipe();

    let result = pipe.transform([], 'SEC');
    expect(result).toEqual([]);

    result = pipe.transform(testResultsPipe, '');
    expect(result).toEqual(testResultsPipe);

    result = pipe.transform(testResultsPipe, 'SEC');
    expect(result.length).toEqual(1);
    expect(result[0].snippet.title).toEqual('second');
  });
});
