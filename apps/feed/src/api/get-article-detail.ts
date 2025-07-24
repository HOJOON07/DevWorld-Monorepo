import { APIBuilder } from '@devworld/axios-client';

type GetArticleDetailRequestType = string;

export interface GetArticleDetailResponseType {
  id: number;
  createdAt: string;
  updatedAt: Date;
  title: string;
  description: string;
  contents: any;
  likeCount: number;
  commentCount: number;
}

export const getArticleDetail = async (
  articleId: GetArticleDetailRequestType,
): Promise<GetArticleDetailResponseType> => {
  const api = APIBuilder.get(`/articles/${articleId}`).withCredentials(false).build();

  const { data } = await api.call<GetArticleDetailResponseType>();

  return data;
};
