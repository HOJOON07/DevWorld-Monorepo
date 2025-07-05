import { Toaster } from '@devworld/ui';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export default Layout;
