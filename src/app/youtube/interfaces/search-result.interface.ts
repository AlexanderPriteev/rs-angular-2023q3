import { ISearchItem } from './search-item.interface';

interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface ISearchResults {
  TODO?: string;
  kind: string;
  etag: string;
  nextPageToken?: string;
  pageInfo: IPageInfo;
  items: ISearchItem[];
  regionCode?: string;
}
