import { SearchItemInterface } from '../search-item/search-item.interface';

interface PageInfoInterface {
  totalResults: number;
  resultsPerPage: number;
}

export interface SearchResultsInterface {
  TODO?: string;
  kind: string;
  etag: string;
  pageInfo: PageInfoInterface;
  items: SearchItemInterface[];
}
