import { APIBuilder } from '@devworld/axios-client';

type isPrivateType = 'private' | 'open';

export interface getDocsDetailRequest {
  id: string;
}

export interface getDocsDetailResponse {
  title: string;
  contents: any;
  description: string;
  isPrivate: isPrivateType;
  articleImage?: string;
}

export const getDocsDetail = async ({ id }: getDocsDetailRequest) => {
  const api = APIBuilder.get(`/articles/workspace/${id}`).withCredentials(true).build();

  const response = await api.call<getDocsDetailResponse>();

  return response.data;
};
