import { AppRoutingManager } from '@devworld/shell-router';
import type { RouteObject } from 'react-router-dom';
import { SignInPage } from '../../pages';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppRoutingManager type='auth' />,
    children: [
      {
        index: true,
        element: <SignInPage />,
      },
    ],
  },
];
