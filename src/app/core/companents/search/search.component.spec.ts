import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';
import {SearchService} from "../../services/search.service";


class MockSearchService {
  triggerSearch(): void {}
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchService: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule],
      providers: [
        { provide: SearchService, useClass: MockSearchService }
      ]
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchService with correct value', fakeAsync(() => {
    const triggerSearchSpy = jest.spyOn(searchService, 'triggerSearch');
    component['searchItem'].next('test');
    tick(500)
    expect(triggerSearchSpy).toHaveBeenCalledWith('test');
  }));

  it('should call searchService with invalid value', fakeAsync(() => {
    const triggerSearchSpy = jest.spyOn(searchService, 'triggerSearch');
    component['searchItem'].next('tt');
    tick(500)
    expect(triggerSearchSpy).not.toHaveBeenCalled();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchItem with correct value', () => {
    const searchItemSpy = jest.spyOn(component['searchItem'], 'next');
    component['searchTerm'] = 'test';
    component.onSearch();
    expect(searchItemSpy).toHaveBeenCalledWith('test');
  });

});
