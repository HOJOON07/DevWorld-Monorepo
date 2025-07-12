import { Toaster } from '@devworld/ui';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../provider/auth-provider';
import { GlobalNavigateProvider } from '../provider/global-navigate-provider';

const AppContainer = () => {
  return (
    <AuthProvider>
      <GlobalNavigateProvider>
        <Outlet />
        <Toaster />
      </GlobalNavigateProvider>
    </AuthProvider>
  );
};

export default AppContainer;
