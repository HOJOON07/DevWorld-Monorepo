import { useEditableEditor } from '@devworld/editor';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDocsDetail } from '../app/api/query-hooks/use-get-docs-detail';

export default function Detail() {
  const { id } = useParams();
  const { data } = useGetDocsDetail({ id });
  const { Editor, setValue } = useEditableEditor();

  useEffect(() => {
    if (data?.contents) {
      setValue(data.contents);
    }
  }, [data?.contents, setValue]);

  return <Editor className='min-w-0 overflow-hidden px-20' />;
}
