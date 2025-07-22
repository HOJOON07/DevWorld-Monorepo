import { AppRoutingManager } from '@devworld/shell-router';
import { QueryProvider } from '@devworld/tanstack-query-client';
import { Navigate, type RouteObject } from 'react-router-dom';
import { WorkspaceLayout } from '../../layouts/workspace-layout';
import Detail from '../../pages/Detail';
import Docs from '../../pages/Docs';
import Write from '../../pages/Write';

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
        path: '',
        element: <WorkspaceLayout />,
        children: [
          {
            index: true,
            element: <Navigate to='/docs' />,
          },
          {
            path: 'docs',
            element: <Docs />,
          },
          {
            path: 'write',
            children: [
              {
                index: true,
                element: <Write />,
              },
              {
                path: ':id',
                element: <Detail />,
              },
            ],
          },
        ],
      },
    ],
  },
];
