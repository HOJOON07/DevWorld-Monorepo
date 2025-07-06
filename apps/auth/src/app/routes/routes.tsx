import { AppRoutingManager } from '@devworld/shell-router';
import { type RouteObject } from 'react-router-dom';
import { OAuthCallbackPage, SignInPage } from '../../pages';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppRoutingManager type='app-auth' />,
    children: [
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'callback/:provider',
        element: <OAuthCallbackPage />,
      },
    ],
  },
];
