interface ImageSizeInterface {
  url: string;
  width: number;
  height: number;
}

interface ItemThumbnailsInterface {
  default: ImageSizeInterface;
  medium: ImageSizeInterface;
  high: ImageSizeInterface;
  standard: ImageSizeInterface;
  maxres: ImageSizeInterface;
}

interface ItemLocalizedInterface {
  title: string;
  description: string;
}

interface ItemSnippetInterface {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: ItemThumbnailsInterface;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: ItemLocalizedInterface;
  defaultAudioLanguage: string;
}
interface ItemStatisticsInterface {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface SearchItemInterface {
  kind: string;
  etag: string;
  id: string;
  snippet: ItemSnippetInterface;
  statistics: ItemStatisticsInterface;
}
