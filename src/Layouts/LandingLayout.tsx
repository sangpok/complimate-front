import { useAuth } from '@Hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export const LandingLayout = () => {
  const { hasAuth } = useAuth();

  return hasAuth ? <Navigate to="/app" replace /> : <Outlet />;
};
