import { AppRoutingManager } from '@devworld/shell-router';
import { QueryProvider } from '@devworld/tanstack-query-client';
import { type RouteObject } from 'react-router-dom';
import { OAuthCallbackPage, SignInPage, SignUpPage } from '../../pages';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <QueryProvider>
        <AppRoutingManager type='app-auth' />
      </QueryProvider>
    ),
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
