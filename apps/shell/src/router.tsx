import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { appFeedBasename } from './constants/prefix';
import Layout from './components/layout';
import AppFeed from './components/app-feed';

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
