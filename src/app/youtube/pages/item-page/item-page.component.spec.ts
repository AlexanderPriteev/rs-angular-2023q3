import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture, fakeAsync, TestBed, tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { testItem } from '../../companents/search-item/search-item.component.spec';
import { ISearchResults } from '../../interfaces/search-result.interface';
import { ResultsService } from '../../services/results.service';
import { ItemPageComponent } from './item-page.component';

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
      imports: [HttpClientModule, RouterTestingModule, StoreModule.forRoot({})],
      providers: [
        {
          provide: ResultsService,
          useValue: {
            getItemById: jest.fn().mockReturnValue(of(testResults)),
          },
        },
      ]
    });
    fixture = TestBed.createComponent(ItemPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(component).toBeTruthy();
  }));
});
