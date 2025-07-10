import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppAuth from './components/app-auth';
import AppFeed from './components/app-feed';
import AppContainer from './components/container';
import { appAuthBaseName, appFeedBaseName } from './constants/prefix';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppContainer />,
    children: [
      {
        path: `${appFeedBaseName}/*`,
        element: <AppFeed />,
      },
      { path: `${appAuthBaseName}/*`, element: <AppAuth /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={browserRouter} />;
}
