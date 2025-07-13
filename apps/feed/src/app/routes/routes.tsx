import { AppRoutingManager } from '@devworld/shell-router';
import { QueryProvider } from '@devworld/tanstack-query-client';
import { type RouteObject } from 'react-router-dom';
import MainPage from '../../pages/main-page';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <QueryProvider>
        <AppRoutingManager type='app-feed' />
      </QueryProvider>
    ),
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
];
