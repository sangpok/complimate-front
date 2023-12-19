import { useAuth } from '@Hooks/useAuth';
import { QueryClient } from '@tanstack/react-query';
import { Navigate, Outlet, useLoaderData } from 'react-router-dom';

import * as API from '@API/index';

export const loader = (queryClient: QueryClient) => async () => {
  try {
    return await API.getAuthStatus();
  } catch (error) {
    return false;
  }
};

export const LandingLayout = () => {
  const { hasAuth, updateAuth } = useAuth();
  const userAuth = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;

  if (!hasAuth && userAuth) {
    updateAuth(true);
  }

  return hasAuth || userAuth ? <Navigate to="/app" replace /> : <Outlet />;
};
