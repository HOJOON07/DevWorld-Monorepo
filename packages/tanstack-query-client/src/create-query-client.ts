import { QueryClient } from '@tanstack/react-query';

export interface QueryClientConfig {
  queries?: {
    staleTime?: number;
    cacheTime?: number;
    retry?: number;
    refetchOnWindowFocus?: boolean;
    refetchOnReconnect?: boolean;
  };
  mutations?: {
    retry?: number;
  };
}

export function createQueryClient(overrides?: QueryClientConfig): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 1,
        cacheTime: 1000 * 60 * 3,
        retry: 3,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        ...overrides?.queries,
      },
      mutations: {
        retry: 1,
        ...overrides?.mutations,
      },
    },
  });
}
