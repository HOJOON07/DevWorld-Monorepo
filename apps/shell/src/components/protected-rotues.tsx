import { Navigate } from 'react-router-dom';
import { useAuth } from '../provider/auth-provider';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={'/auth/signin'} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
