import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppFeed from './components/app-feed';
import Layout from './components/layout';
import { appFeedBasename } from './constants/prefix';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={appFeedBasename} />,
      },
      {
        path: `${appFeedBasename}/*`,
        element: <AppFeed />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={browserRouter} />;
}
