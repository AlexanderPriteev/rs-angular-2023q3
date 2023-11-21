import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ResultsService } from './results.service';

describe('SearchResultService', () => {
  let service: ResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResultsService],
    });
    service = TestBed.inject(ResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
