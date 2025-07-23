import { Feed } from '../../api/get-feeds';
import { useGetFeeds } from '../../api/query-hooks/use-get-feeds';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import FeedCard from './Card';

export default function Feeds() {
  const { allData, observerRef, isLoading, isFetchingNextPage, error, clearError } =
    useInfiniteScroll<Feed>(useGetFeeds, {
      delay: 200,
      onError: (err) => {
        console.error('Feed fetch error:', err);
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
    <div className='mx-auto flex max-w-[640px] flex-col gap-8'>
      {isLoading ? (
        <div className='flex items-center justify-center p-8'>
          <div className='text-muted-foreground'>Loading documents...</div>
        </div>
      ) : (
        <>
          {allData.map((feed) => (
            <FeedCard key={feed.id} {...feed} />
          ))}
          {isFetchingNextPage && (
            <div className='flex items-center justify-center p-4'>
              <div className='text-muted-foreground text-sm'>Loading more...</div>
            </div>
          )}
        </>
      )}
      <div className='mb-10 h-10 w-full touch-none' ref={observerRef} />
    </div>
  );
}
