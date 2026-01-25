import { Toaster } from '@devworld/ui';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div>
        main
        <Outlet />
        <Toaster />
      </div>
    </>
  );
};

export default Layout;
