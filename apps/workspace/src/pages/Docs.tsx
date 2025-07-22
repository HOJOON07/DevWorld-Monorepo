import { useCallback, useEffect, useRef } from 'react';
import { useGetDocs } from '../app/api/query-hooks/use-get-docs';
import { DocsTableHeader } from '../components/docs/docs-table-header';
import { DocsTableItem } from '../components/docs/docs-table-item';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Docs() {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { entry } = useIntersectionObserver(observerRef, {});
  const isPageEnd = !!entry?.isIntersecting;

  const { fetchNextPage, hasNextPage, data } = useGetDocs();

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: number;
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 200);
    }
    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage]);

  const allDocs = data?.pages?.flatMap((page) => page.data) ?? [];

  return (
    <div className='flex h-full flex-col'>
      <DocsTableHeader />

      <div className='flex-1 overflow-y-auto'>
        {allDocs.map((doc, index) => (
          <DocsTableItem key={doc.id} {...doc} />
        ))}
      </div>
      <div className='mb-10 h-10 w-full touch-none' ref={observerRef} />
    </div>
  );
}
