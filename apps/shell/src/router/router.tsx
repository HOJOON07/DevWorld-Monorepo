import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppContainer from '../components/container';
import { routeConfig } from './route-config';
import RouteGuard from './route-guard';

const browserRouter = createBrowserRouter([
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
