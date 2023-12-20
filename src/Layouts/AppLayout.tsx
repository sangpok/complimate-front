import { useAuth } from '@Hooks/useAuth';
import { Navigate, Outlet, redirect, useLoaderData } from 'react-router-dom';

import * as API from '@API/index';

export const loader = (queryClient: QueryClient) => async () => {
  console.log('AppLayout Loader 옴');
  try {
    return await API.getAuthStatus();
  } catch (error) {
    return redirect('/');
  }
};

export const AppLayout = () => {
  const { hasAuth, updateAuth } = useAuth();
  const userAuth = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;

  if (hasAuth && !userAuth) {
    updateAuth(false);
  }

  if (!hasAuth && userAuth) {
    updateAuth(true);
  }

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

  return hasAuth || userAuth ? AnimatedOutlet : <Navigate to="/" replace />;
};
