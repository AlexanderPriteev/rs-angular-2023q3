import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemComponent } from './search-item.component';
import {ButtonModule} from "../../../shared/modules/button.module";
import {ISearchItem} from "../../interfaces/search-item.interface";
import {AgeColorDirective} from "../../directives/age-color.directive";
import {AppRoutesModule} from "../../../core/modules/routes.module";


export const testItem: ISearchItem = {
  kind: 'youtube#video',
  etag: 'etag',
  id: {
    kind: 'kind',
    videoId: 'videoId'
  },
  snippet: {
    title: 'title',
    description: 'description',
    publishedAt: '2019-05-30T12:42:19.000Z',
    publishedTime: '2019-05-30T12:42:19.000Z',
    tags: ['tags'],
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/YN8zNnV0sK8/default.jpg',
      },
      medium:  {
        url: 'https://i.ytimg.com/vi/YN8zNnV0sK8/default.jpg',
      },
      high:  {
        url: 'https://i.ytimg.com/vi/YN8zNnV0sK8/default.jpg',
      },
    },
    categoryId: 'categoryId',
    channelTitle: 'channelTitle',
    liveBroadcastContent: 'none',
  }
} as ISearchItem;

describe('SearchItemComponent', () => {
  let component: SearchItemComponent;
  let fixture: ComponentFixture<SearchItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchItemComponent, AgeColorDirective],
      imports: [ButtonModule, AppRoutesModule],
    });
    fixture = TestBed.createComponent(SearchItemComponent);
    component = fixture.componentInstance;
    component.searchItem = testItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
