import { AppRoutingManager } from '@devworld/shell-router';
import { type RouteObject } from 'react-router-dom';
import { OAuthCallbackPage, SignInPage, SignUpPage } from '../../pages';

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
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'callback/:provider',
        element: <OAuthCallbackPage />,
      },
    ],
  },
];
