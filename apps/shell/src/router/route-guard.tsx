import { Navigate } from 'react-router-dom';
import { useAuth } from '../provider/auth-provider';
import { RouteRedirectUrl, RouteType } from './route-config';

interface RouteGuardProps {
  children: React.ReactNode;
  type: RouteType;
  redirect?: RouteRedirectUrl;
}

const RouteGuard = ({ children, type, redirect }: RouteGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  switch (type) {
    case RouteType.PRIVATE:
      if (!isAuthenticated) {
        return <Navigate to={redirect as RouteRedirectUrl.PRIVATE} />;
      }
      break;
    case RouteType.GUEST:
      if (isAuthenticated) {
        return <Navigate to={redirect as RouteRedirectUrl.GUEST} replace />;
      }
      break;
    case RouteType.PUBLIC:
    default:
      break;
  }

  return <>{children}</>;
};

export default RouteGuard;
