import { AppRoutingManager } from '@devworld/shell-router';
import { QueryProvider } from '@devworld/tanstack-query-client';
import { type RouteObject } from 'react-router-dom';
import WorkspacePage from '../../pages/WorkspacePage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <QueryProvider>
        <AppRoutingManager type='app-workspace' />
      </QueryProvider>
    ),
    children: [
      {
        index: true,
        element: <WorkspacePage />,
      },
    ],
  },
];
