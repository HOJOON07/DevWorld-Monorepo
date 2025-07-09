import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { createQueryClient, QueryClientConfig } from './create-query-client';

interface QueryProviderProps {
  children: ReactNode;
  config?: QueryClientConfig;
}

export function QueryProvider({ children, config }: QueryProviderProps) {
  const [queryClient] = useState(() => createQueryClient(config));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
