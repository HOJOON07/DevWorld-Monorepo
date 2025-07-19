import React from 'react';
import { Navigate } from 'react-router-dom';
import AppAuth from '../components/app-auth';
import AppFeed from '../components/app-feed';
import AppWorkspace from '../components/app-workspace';
import { appAuthBaseName, appFeedBaseName, appWorkspaceBaseName } from '../constants/prefix';

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
  path?: string;
  element: React.ReactNode;
  type: RouteType;
  redirect?: RouteRedirectUrl;
}

export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    element: <Navigate to='/feed' replace />,
    type: RouteType.PUBLIC,
  },
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
  {
    path: `${appWorkspaceBaseName}/*`,
    element: <AppWorkspace />,
    type: RouteType.PRIVATE,
    redirect: RouteRedirectUrl.PRIVATE,
  },
];
