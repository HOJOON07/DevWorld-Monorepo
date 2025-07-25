import { useQuery } from '@devworld/tanstack-query-client';
import { useSidePanelStore } from '../../stores/side-panel-store';
import { GetAuthorResponseType, getAuthor } from '../get-author';

export const useGetAuthor = () => {
  const selectedArticleId = useSidePanelStore((state) => state.selectedArticleId);

  return useQuery<GetAuthorResponseType>({
    queryKey: ['article', 'author', selectedArticleId],
    queryFn: () => getAuthor(selectedArticleId),
    enabled: !!selectedArticleId,
  });
};
