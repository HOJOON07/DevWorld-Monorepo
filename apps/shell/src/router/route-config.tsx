import React from 'react';
import AppAuth from '../components/app-auth';
import AppFeed from '../components/app-feed';
import { appAuthBaseName, appFeedBaseName } from '../constants/prefix';

export enum RouteType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  GUEST = 'guest',
}

export enum RouteRedirectUrl {
  PRIVATE = '/auth/signin',
  GUEST = '/feed',
}
export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  type: RouteType;
  redirect: RouteRedirectUrl;
}

export const routeConfig: RouteConfig[] = [
  {
    path: `${appAuthBaseName}/*`,
    element: <AppAuth />,
    type: RouteType.GUEST,
    redirect: RouteRedirectUrl.GUEST,
  },
  {
    path: `${appFeedBaseName}/*`,
    element: <AppFeed />,
    type: RouteType.PUBLIC,
  },
];
