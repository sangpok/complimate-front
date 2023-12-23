import { useAuth } from '@Hooks/useAuth';
import { Navigate, Outlet, redirect, useLoaderData } from 'react-router-dom';

import * as API from '@API/index';

import styled from '@emotion/styled';

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
    <Background>
      <Outlet />
    </Background>
  );

  return hasAuth || userAuth ? AnimatedOutlet : <Navigate to="/" replace />;
};

const Background = styled.div(
  {
    width: '100dvw',
    height: '100dvh',
  },
  ({ theme }) => ({ background: theme.colors.background.default, color: theme.colors.text.default })
);
