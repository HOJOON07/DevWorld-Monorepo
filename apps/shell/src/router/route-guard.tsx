import { Navigate } from 'react-router-dom';
import { useAuth } from '../provider/auth-provider';
import { RouteConfig, RouteRedirectUrl, RouteType } from './route-config';

interface RouteGuardProps {
  children: React.ReactNode;
  type: RouteType;
  redirect?: RouteRedirectUrl;
}

const RouteGuard = ({ children, type, redirect }: RouteGuardProps) => {
  const { isAuthenticated } = useAuth();

  switch (type) {
    case RouteType.PRIVATE:
      if (!isAuthenticated) {
        return <Navigate to={redirect as RouteRedirectUrl.PRIVATE} replace />;
      }
      break;
    case RouteType.GUEST:
      if (isAuthenticated) {
        return <Navigate to={redirect as RouteRedirectUrl.GUEST} replace />;
      }
    case RouteType.PUBLIC:
    default:
      break;
  }

  return <>{children}</>;
};

export default RouteGuard;
