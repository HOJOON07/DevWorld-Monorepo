import { useParams } from 'react-router-dom';
import { useGetDocsDetail } from '../app/api/query-hooks/use-get-docs-detail';
import LoadingSpinner from '../components/common/loading-spinner';
import WorkspaceEditor from '../components/editor/Editor';

export default function Detail() {
  const { id } = useParams();
  const { data, isLoading } = useGetDocsDetail({ id });

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  return <WorkspaceEditor value={data?.contents} />;
}
