import { VideoStatsPipe } from './video-stats.pipe';
import {ISearchResults} from "../interfaces/search-result.interface";
import {testResults} from "../pages/item-page/item-page.component.spec";
import {of} from "rxjs";

describe('VideoStatsPipe', () => {
  it('create an instance', () => {
    const pipe = new VideoStatsPipe();
    const searchMock: ISearchResults = testResults;
    const videoMock = [of(testResults)];

    pipe.transform(searchMock, videoMock).subscribe((result) => {
      expect(result.items).toBeDefined();
    });
  });
});
