import { UseInfiniteQueryResult } from '@devworld/tanstack-query-client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

// Generic 인터페이스 정의
interface InfiniteScrollData {
  id: string | number;
  [key: string]: any;
}

interface InfiniteScrollOptions {
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  onError?: (error: any) => void;
}

interface UseInfiniteScrollResult<T> {
  data: UseInfiniteQueryResult<any>['data'];
  allData: T[];
  observerRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  error: any;
  clearError: () => void;
}

export const useInfiniteScroll = <T extends InfiniteScrollData>(
  queryHook: () => UseInfiniteQueryResult<any>,
  options: InfiniteScrollOptions = {},
): UseInfiniteScrollResult<T> => {
  const { delay = 200, threshold = 0.1, rootMargin = '0%', onError } = options;

  const [error, setError] = useState<any>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const { entry } = useIntersectionObserver(observerRef, {
    threshold,
    rootMargin,
  });

  const isPageEnd = !!entry?.isIntersecting;

  const {
    fetchNextPage,
    hasNextPage,
    data,
    isLoading,
    isFetchingNextPage,
    error: queryError,
  } = queryHook();

  // 데이터 플래튼
  const allData = useMemo(() => {
    return data?.pages?.flatMap((page: any) => page.data) ?? [];
  }, [data]);

  const fetchNext = useCallback(async () => {
    try {
      const res = await fetchNextPage();
      if (res.isError) {
        const errorToHandle = res.error;
        setError(errorToHandle);
        onError?.(errorToHandle);
      }
    } catch (err) {
      setError(err);
      onError?.(err);
    }
  }, [fetchNextPage, onError]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    let timerId: number;
    if (isPageEnd && hasNextPage && !isFetchingNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, delay);
    }
    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage, isFetchingNextPage, delay]);

  return {
    data,
    allData,
    observerRef,
    isLoading,
    isFetchingNextPage,
    hasNextPage: hasNextPage ?? false,
    error: error || queryError,
    clearError,
  };
};
