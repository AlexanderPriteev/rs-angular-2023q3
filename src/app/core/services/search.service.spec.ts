import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should triggerSearch', () => {
    const testData = 'test';
    let emittedData: string | undefined;
    service.searchTrigger$.subscribe(data => {
      emittedData = data;
    });
    service.triggerSearch(testData);
    expect(emittedData).toEqual(testData);
  });
});
