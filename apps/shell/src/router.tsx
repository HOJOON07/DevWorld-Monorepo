import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppAuth from './components/app-auth';
import AppFeed from './components/app-feed';
import Layout from './components/layout';
import { appAuthBaseName, appFeedBaseName } from './constants/prefix';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: `${appFeedBaseName}/*`,
    element: <AppFeed />,
  },
  { path: `${appAuthBaseName}/*`, element: <AppAuth /> },
]);

export default function Router() {
  return <RouterProvider router={browserRouter} />;
}
