import { TestBed } from '@angular/core/testing';

import { SortService } from './sort.service';

describe('SortService', () => {
  let service: SortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should triggerSort with date', () => {
    const sortData = 'date';
    let emittedData: (string | boolean)[] | undefined;
    service.sortTrigger$.subscribe(data => {
      emittedData = data;
    });
    service.triggerSort(sortData);
    expect(emittedData).toEqual([sortData, true]);
  });

  it('should triggerFilter and update filterTrigger$', () => {
    const filterData = 'test';
    let emittedData: string | undefined;
    service.filterTrigger$.subscribe(data => {
      emittedData = data;
    });
    service.triggerFilter(filterData);
    expect(emittedData).toEqual(filterData);
  });

});
