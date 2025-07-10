import { Toaster } from '@devworld/ui';
import { Outlet } from 'react-router-dom';
import { GlobalNavigateProvider } from '../provider/global-navigate-provider';

const Layout = () => {
  return (
    <GlobalNavigateProvider>
      <Outlet />
      <Toaster />
    </GlobalNavigateProvider>
  );
};

export default Layout;
