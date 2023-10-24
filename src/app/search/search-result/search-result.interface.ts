import { ISearchItem } from '../search-item/search-item.interface';

interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface ISearchResults {
  TODO?: string;
  kind: string;
  etag: string;
  pageInfo: IPageInfo;
  items: ISearchItem[];
}
