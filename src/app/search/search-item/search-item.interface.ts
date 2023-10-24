interface IImageSize {
  url: string;
  width: number;
  height: number;
}

interface IItemThumbnails {
  default: IImageSize;
  medium: IImageSize;
  high: IImageSize;
  standard: IImageSize;
  maxres: IImageSize;
}

interface IItemLocalized {
  title: string;
  description: string;
}

interface IItemSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IItemThumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: IItemLocalized;
  defaultAudioLanguage: string;
}
interface IItemStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface ISearchItem {
  kind: string;
  etag: string;
  id: string;
  snippet: IItemSnippet;
  statistics: IItemStatistics;
}
