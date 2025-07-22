import { useInfiniteQuery } from '@devworld/tanstack-query-client';
import { getDocs, getDocsResponseType } from '../get-docs';

const api_uri = '/articles/workspace';

export const useGetDocs = () => {
  return useInfiniteQuery<getDocsResponseType>({
    queryKey: ['workspace/docs'],
    queryFn: ({ pageParam }) => getDocs(pageParam as string),
    initialPageParam: api_uri,
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });
};
