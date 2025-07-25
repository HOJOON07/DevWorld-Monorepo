import { useQuery } from '@devworld/tanstack-query-client';
import { useSidePanelStore } from '../../stores/side-panel-store';
import { GetArticleDetailResponseType, getArticleDetail } from '../get-article-detail';

export const useGetArticleDetail = () => {
  const selectedArticleId = useSidePanelStore((state) => state.selectedArticleId);

  return useQuery<GetArticleDetailResponseType>({
    queryKey: ['article', 'detail', selectedArticleId],
    queryFn: () => getArticleDetail(selectedArticleId!),
    enabled: !!selectedArticleId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
