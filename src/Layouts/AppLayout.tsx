import { useAuth } from '@Hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export const AppLayout = () => {
  const { hasAuth } = useAuth();

  const AnimatedOutlet = (
    <div
      style={{
        width: '100dvw',
        height: '100dvh',
        boxShadow: '-50px 0 50px 1px rgba(0, 0, 0, .3)',
      }}
    >
      <Outlet />
    </div>
  );

  return hasAuth ? AnimatedOutlet : <Navigate to="/" replace />;
};
