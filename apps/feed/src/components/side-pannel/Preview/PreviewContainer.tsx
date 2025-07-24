import { useGetArticleDetail } from '../../../api/query-hooks/use-get-article-detail';
import { useSidePanelStore } from '../../../stores/side-panel-store';
import ArticleContent from './ArticleContent';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import LoadingState from './LoadingState';

export default function PreviewContainer() {
  const selectedArticleId = useSidePanelStore(state => state.selectedArticleId);
  const { data, isLoading, error, refetch } = useGetArticleDetail();

  // 선택된 article이 없을 때
  if (!selectedArticleId) {
    return <EmptyState message="Click 'Read more' on any article to preview it here" />;
  }

  // 로딩 중일 때
  if (isLoading) {
    return <LoadingState />;
  }

  // 에러가 발생했을 때
  if (error) {
    return <ErrorState error={error} onRetry={() => refetch()} />;
  }

  // 데이터가 없을 때 (API는 성공했지만 데이터가 없음)
  if (!data) {
    return <EmptyState message="Article not found" />;
  }

  // 정상적으로 데이터가 있을 때
  return <ArticleContent article={data} />;
}