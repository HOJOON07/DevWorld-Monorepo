import { useGetDocs } from '../app/api/query-hooks/use-get-docs';
import { DocsTableHeader } from '../components/docs/docs-table-header';
import { type DocsItemProps, DocsTableItem } from '../components/docs/docs-table-item';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

export default function Docs() {
  const {
    allData: allDocs,
    observerRef,
    isLoading,
    isFetchingNextPage,
    error,
    clearError,
  } = useInfiniteScroll<DocsItemProps>(useGetDocs, {
    delay: 200,
    onError: (err) => {
      console.error('Docs fetch error:', err);
    },
  });

  if (error) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <p className='text-red-500'>Error loading documents</p>
        <button onClick={clearError} className='mt-2 rounded bg-blue-500 px-4 py-2 text-white'>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col'>
      <DocsTableHeader />

      <div className='flex-1 overflow-y-auto'>
        {isLoading ? (
          <div className='flex items-center justify-center p-8'>
            <div className='text-muted-foreground'>Loading documents...</div>
          </div>
        ) : (
          <>
            {allDocs.map((doc) => (
              <DocsTableItem key={doc.id} {...doc} />
            ))}
            {isFetchingNextPage && (
              <div className='flex items-center justify-center p-4'>
                <div className='text-muted-foreground text-sm'>Loading more...</div>
              </div>
            )}
          </>
        )}
      </div>
      <div className='mb-10 h-10 w-full touch-none' ref={observerRef} />
    </div>
  );
}
