import { AppRoutingManager } from '@devworld/shell-router';
import type { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppRoutingManager type='app-feed' />,
    children: [
      {
        // index: true,
        element: <div>Feed Root</div>,
      },
      {
        path: '1',
        element: <div>Feed 1</div>,
      },
    ],
  },
];
