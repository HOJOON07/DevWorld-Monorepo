import { useQuery } from '@devworld/tanstack-query-client';
import { getArticleDetail, GetArticleDetailResponseType } from '../get-article-detail';
import { useSidePanelStore } from '../../stores/side-panel-store';

export const useGetArticleDetail = () => {
  // selector로 selectedArticleId만 구독 - 다른 store 변경시 리렌더링 방지
  const selectedArticleId = useSidePanelStore(state => state.selectedArticleId);
  
  return useQuery<GetArticleDetailResponseType>({
    queryKey: ['article', 'detail', selectedArticleId],
    queryFn: () => getArticleDetail(selectedArticleId!),
    enabled: !!selectedArticleId, // ID가 있을 때만 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000,   // 10분 후 가비지 컬렉션
  });
};
