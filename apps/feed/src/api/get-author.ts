import { APIBuilder } from '@devworld/axios-client';

type GetAuthorRequestType = string | null;

type articleId = number;

export interface AuthorType {
  id: number;
  email: string;
  devName: string;
  position: string | null;
  bio: string | null;
  location: string | null;
  github: string | null;
  linkedin: string | null;
  instagram: string | null;
  socialEtc: string | null;
  followerCount: number;
  followeeCount: number;
}

export interface GetAuthorResponseType {
  id: articleId;
  author: AuthorType;
}

export const getAuthor = async (
  articleId: GetAuthorRequestType,
): Promise<GetAuthorResponseType> => {
  const api = APIBuilder.get(`/articles/author/${articleId}`).withCredentials(false).build();

  const { data } = await api.call<GetAuthorResponseType>();
  return data;
};
