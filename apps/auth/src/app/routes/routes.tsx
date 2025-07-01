import { AppRoutingManager } from '@devworld/shell-router';
import { Navigate, type RouteObject } from 'react-router-dom';
import { SignInPage } from '../../pages';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppRoutingManager type='app-auth' />,
    children: [
      {
        index: true,
        element: <Navigate to='signin' />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
    ],
  },
];
