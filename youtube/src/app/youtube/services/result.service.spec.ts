import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { testItem } from '../companents/search-item/search-item.component.spec';
import { ISearchResults } from '../interfaces/search-result.interface';
import { VideoStatsPipe } from '../pipes/video-stats.pipe';
import { ResultsService } from './results.service';

export const testResultsData = {
  kind: 'youtube#searchList',
  etag: 'etag',
  pageInfo: {
    totalResults: 3,
    resultsPerPage: 3,
  },
  items: [
    {
      ...testItem,
      snippet: { ...testItem.snippet, title: 'first' },
    },
    {
      ...testItem,
      snippet: { ...testItem.snippet, title: 'second' },
    },
    {
      ...testItem,
      snippet: { ...testItem.snippet, title: 'third' },
    }
  ]
} as ISearchResults;

describe('SearchResultService', () => {
  let service: ResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResultsService, VideoStatsPipe],
    });

    service = TestBed.inject(ResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called getMergeMap', () => {
    const spy = jest.spyOn(service, 'getMergeMap');
    service.getMergeMap(testResultsData);
    expect(spy).toBeCalled();
  });

  it('should be called getSearchResults', () => {
    const spy = jest.spyOn(service, 'getSearchResults');
    service.getSearchResults('query');
    expect(spy).toBeCalled();
  });
});
