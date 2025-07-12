import { APIBuilder } from '@devworld/axios-client';
import { BroadcastChannelEventBus } from '@devworld/event-bus';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppAuth from '../components/app-auth';
import AppFeed from '../components/app-feed';
import AppContainer from '../components/container';
import ProtectedRoute from '../components/protected-rotues';
import { appAuthBaseName, appFeedBaseName } from '../constants/prefix';
import { routeConfig } from './route-config';
import RouteGuard from './route-guard';

const browserRouter = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <AppContainer />,
  //   children: [
  //     {
  //       path: `${appFeedBaseName}/*`,
  //       element: <AppFeed />,
  //     },
  //     { path: `${appAuthBaseName}/*`, element: <AppAuth /> },
  //     {
  //       path: '/workspaces',
  //       element: (
  //         <ProtectedRoute>
  //           <div>
  //             workspace root
  //             <button
  //               onClick={async () => {
  //                 const api = APIBuilder.post('/auth/logout', {}).withCredentials(true).build();
  //                 await api.call();
  //                 const eventBus = new BroadcastChannelEventBus('auth-channel');
  //                 eventBus.emit('auth-change', false);
  //                 console.log('event bus click');
  //               }}
  //             >
  //               logout event
  //             </button>
  //           </div>
  //         </ProtectedRoute>
  //       ),
  //     },
  //   ],
  // },
  {
    path: '/',
    element: <AppContainer />,
    children: routeConfig.map((route) => ({
      path: route.path,
      element: (
        <RouteGuard type={route.type} redirect={route.redirect}>
          {route.element}
        </RouteGuard>
      ),
    })),
  },
]);

export default function Router() {
  return <RouterProvider router={browserRouter} />;
}
