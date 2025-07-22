import { APIBuilder } from '@devworld/axios-client';
import { PublishType } from '../../lib/publish-form-schema';

export type CreateDocsRequest = PublishType;

export const createDocs = async (formData: CreateDocsRequest) => {
  const api = APIBuilder.post('/articles', {
    ...formData,
  })
    .withCredentials(true)
    .build();
  const response = await api.call();

  return response.data;
};
