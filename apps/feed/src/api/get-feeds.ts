import { APIBuilder } from '@devworld/axios-client';

export interface Feed {
  author: {
    avatarImage: string;
    devName: string;
    location: string;
    position: string;
    image: string;
  };
  title: string;
  description: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  thumbnails?: [];
  id: number;
  articleImage: string;
}

export interface getFeedResponseType {
  data: Feed[];
  count: number;
  cursor: {
    after: number | null;
  };
  next: string | null;
}

export const getFeeds = async (url: string): Promise<getFeedResponseType> => {
  const api = APIBuilder.get(url).withCredentials(false).build();

  const { data } = await api.call<getFeedResponseType>();

  return data;
};
