import { APIBuilder } from '@devworld/axios-client';

interface DocsType {
  id: number;
  title: string;
  updatedAt: string;
  createdAt: string;
}

export type getDocsResponseType = {
  data: DocsType[];
  count: number;
  cursor: {
    after: number;
  };
  next: number | null;
};

export const getDocs = async (url: string): Promise<getDocsResponseType> => {
  const api = APIBuilder.get(url).withCredentials(true).build();

  const { data } = await api.call<getDocsResponseType>();

  return data;
};
