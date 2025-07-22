import { useQuery } from '@devworld/tanstack-query-client';
import { getDocsDetail, getDocsDetailRequest, getDocsDetailResponse } from '../get-docs-detail';

interface useQueryId extends Omit<getDocsDetailRequest, 'id'> {
  id: string | undefined;
}

export const useGetDocsDetail = ({ id }: useQueryId) => {
  return useQuery<getDocsDetailResponse>({
    queryKey: ['workspace/docs', id],
    queryFn: () => getDocsDetail({ id: id! }),
    enabled: !!id,
  });
};
