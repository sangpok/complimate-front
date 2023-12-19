// import AppLayout from '@Layouts/AppLayout';
// import LandingLayout from '@Layouts/LandingLayout';
// import SettingLayout from '@Layouts/SettingLayout';

import { QueryClient } from '@tanstack/react-query';
import { RouteObject } from 'react-router-dom';

// import AppPage, { loader as appLoader } from '@Pages/App';
// import LandingPage from '@Pages/Landing';
// import LoginPage from '@Pages/Login';
// import MyFeedPage from '@Pages/MyFeed';
// import RegisterPage from '@Pages/Register';
// import SettingPage from '@Pages/Setting';
// import TutorialPage from '@Pages/Tutorial';
// import WritePage from '@Pages/Write';

const TempPage = () => <p>Test Page입니다</p>;

export const getRoutes = (queryClient: QueryClient) =>
  [
    {
      path: '/test',
      async lazy() {
        const { TestPage } = await import('@Pages/Test');
        return { Component: TestPage };
      },
    },
    {
      path: '/',
      async lazy() {
        const { LandingLayout, loader: landingLayoutLoader } = await import(
          '@Layouts/LandingLayout'
        );
        return { Component: LandingLayout, loader: landingLayoutLoader(queryClient) };
      },
      children: [
        {
          index: true,
          async lazy() {
            const { LandingPage } = await import('@Pages/Landing');
            return { Component: LandingPage };
          },
        },
        {
          path: 'login',
          async lazy() {
            const { LoginPage } = await import('@Pages/Login');
            return { Component: LoginPage };
          },
        },
        {
          path: 'register',
          async lazy() {
            const { RegisterPage } = await import('@Pages/Register');
            return { Component: RegisterPage };
          },
        },
        {
          path: 'signup',
          async lazy() {
            const { SignupPage } = await import('@Pages/Signup');
            return { Component: SignupPage };
          },
        },
      ],
    },
    {
      path: '/app',
      id: 'appLayout',
      async lazy() {
        const { AppLayout, loader: appLayoutLoader } = await import('@Layouts/AppLayout');
        return { Component: AppLayout, loader: appLayoutLoader(queryClient) };
      },
      children: [
        {
          index: true,
          async lazy() {
            const { AppPage, loader: appLoader } = await import('@Pages/App');
            return { Component: AppPage, loader: appLoader(queryClient) };
          },
        },
        {
          path: 'tutorial',
          async lazy() {
            const { TutorialPage } = await import('@Pages/Tutorial');
            return { Component: TutorialPage };
          },
        },
        {
          path: 'write',
          async lazy() {
            const { WritePage } = await import('@Pages/Write');
            return { Component: WritePage };
          },
        },
        {
          path: 'myfeed',
          async lazy() {
            const { MyFeedPage } = await import('@Pages/MyFeed');
            return { Component: MyFeedPage };
          },
        },
        {
          path: 'setting',
          async lazy() {
            const { SettingLayout } = await import('@Layouts/SettingLayout');
            return { Component: SettingLayout };
          },
          children: [
            {
              index: true,
              async lazy() {
                const { SettingPage } = await import('@Pages/Setting');
                return { Component: SettingPage };
              },
            },
            {
              path: 'nickname',
              element: <TempPage />,
            },
            {
              path: 'introduce',
              element: <TempPage />,
            },
            {
              path: 'handle_id',
              element: <TempPage />,
            },
            {
              path: 'password',
              element: <TempPage />,
            },
            {
              path: 'theme',
              element: <TempPage />,
            },
            {
              path: 'font_size',
              element: <TempPage />,
            },
            {
              path: 'logout',
              element: <TempPage />,
            },
            {
              path: 'resigin',
              element: <TempPage />,
            },
          ],
        },
      ],
    },
  ] as RouteObject[];
