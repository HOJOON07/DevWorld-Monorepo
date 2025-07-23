import { useInfiniteQuery } from '@devworld/tanstack-query-client';
import { getFeedResponseType, getFeeds } from '../get-feeds';

export type GetFeedParams = {
  where__title__i_like?: string;
  where__description__i_like?: string;
  take: string;
};

const api_uri = '/articles';

export const useGetFeeds = () => {
  return useInfiniteQuery<getFeedResponseType>({
    queryKey: ['feeds'],
    queryFn: ({ pageParam }) => getFeeds(pageParam as string),
    initialPageParam: api_uri,
    getNextPageParam: (lastpage) => {
      console.log('API Response:', lastpage);
      console.log('Next value:', lastpage.next);
      console.log('Next type:', typeof lastpage.next);

      return lastpage.next || undefined;
    },
  });
};
