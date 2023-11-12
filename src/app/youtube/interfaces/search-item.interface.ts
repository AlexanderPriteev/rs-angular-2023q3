interface IImageSize {
  url: string;
  width: number;
  height: number;
}

interface IItemThumbnails {
  default: IImageSize;
  medium: IImageSize;
  high: IImageSize;
  standard?: IImageSize;
  maxres?: IImageSize;
}

interface IItemLocalized {
  title: string;
  description: string;
}

interface IItemSnippet {
  publishedAt: string;
  publishedTime: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IItemThumbnails;
  channelTitle: string;
  tags?: string[];
  categoryId?: string;
  liveBroadcastContent: string;
  localized?: IItemLocalized;
  defaultAudioLanguage?: string;
}
export interface IItemStatistics {
  viewCount?: string;
  likeCount?: string;
  dislikeCount?: string;
  favoriteCount?: string;
  commentCount?: string;
}

interface IItemId {
  kind: string;
  videoId: string;
}

export interface ISearchItem {
  kind: string;
  etag: string;
  id: IItemId;
  snippet: IItemSnippet;
  statistics?: IItemStatistics;
}
