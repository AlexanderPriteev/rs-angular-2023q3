import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ItemPageComponent } from './item-page.component';
import {HttpClientModule} from "@angular/common/http";
import {of} from "rxjs";
import {ResultsService} from "../../services/results.service";
import {testItem} from "../../companents/search-item/search-item.component.spec";
import {ISearchResults} from "../../interfaces/search-result.interface";
import {RouterTestingModule} from "@angular/router/testing";


export const testResults: ISearchResults = {
  kind: 'youtube#searchList',
  etag: 'etag',
  pageInfo: {
    totalResults: 1,
    resultsPerPage: 1,
  },
  items: [testItem],
};

describe('ItemPageComponent', () => {
  let component: ItemPageComponent;
  let fixture: ComponentFixture<ItemPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemPageComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [ResultsService]
    });
    fixture = TestBed.createComponent(ItemPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', fakeAsync(() => {
    const resultService = TestBed.inject(ResultsService);
    jest.spyOn(resultService, 'getItemById' ).mockReturnValue(of(testResults));

    fixture.detectChanges();
    tick();

    expect(component).toBeTruthy();
  }));
});
