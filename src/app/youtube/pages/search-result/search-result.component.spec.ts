import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { testItem } from '../../companents/search-item/search-item.component.spec';
import { ISearchResults } from '../../interfaces/search-result.interface';
import { SearchResultComponent } from './search-result.component';

const testResultsData = {
  kind: 'youtube#searchList',
  etag: 'etag',
  pageInfo: {
    totalResults: 3,
    resultsPerPage: 3,
  },
  items: [
    {
      ...testItem,
      snippet: { ...testItem.snippet, publishedAt: '2023-11-02' },
      statistics: { ...testItem.statistics, viewCount: '10' }
    },
    {
      ...testItem,
      snippet: { ...testItem.snippet, publishedAt: '2023-11-03' },
      statistics: { ...testItem.statistics, viewCount: '5' }
    },
    {
      ...testItem,
      snippet: { ...testItem.snippet, publishedAt: '2023-11-01' },
    }
  ]
} as ISearchResults;

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should sort items by date in ascending order', () => {
    delete testResultsData.items[2].statistics;
    component.searchResults = testResultsData;

    component.dataSort(['date', false]);
    expect(component.searchResults.items[0].snippet.publishedAt).toEqual('2023-11-03');

    component.dataSort(['date', true]);
    expect(component.searchResults.items[0].snippet.publishedAt).toEqual('2023-11-01');

    component.dataSort(['count', true]);
    expect(component.searchResults.items[1].statistics?.viewCount).toEqual('5');

    component.dataSort(['count', false]);
    expect(component.searchResults.items[1].statistics?.viewCount).toEqual('10');
    expect(component.searchResults.items[0].statistics?.viewCount).toBeFalsy();
  });
});
