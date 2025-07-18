import { createRoot } from 'react-dom/client';
import { type RouteObject, RouterProvider } from 'react-router-dom';
import { createRouter } from './router';
import type { RouterType } from './types';

function injectFactory({ routes }: { routes: RouteObject[] }) {
  return ({
    rootElement,
    basePath,
    routerType,
  }: {
    rootElement: HTMLElement;
    basePath?: string;
    routerType: RouterType;
  }) => {
    const router = createRouter({
      type: routerType,
      routes,
      basePath,
    });

    const root = createRoot(rootElement);
    root.render(<RouterProvider router={router} />);

    return () => queueMicrotask(() => root.unmount());
  };
}

export { injectFactory };
