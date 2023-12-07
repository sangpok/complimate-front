// import AppLayout from '@Layouts/AppLayout';
// import LandingLayout from '@Layouts/LandingLayout';
// import SettingLayout from '@Layouts/SettingLayout';

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

export const routes: RouteObject[] = [
  {
    path: '/',
    async lazy() {
      const { LandingLayout } = await import('@Layouts/LandingLayout');
      return { Component: LandingLayout };
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
    async lazy() {
      const { AppLayout } = await import('@Layouts/AppLayout');
      return { Component: AppLayout };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { AppPage, loader } = await import('@Pages/App');
          return { Component: AppPage, loader };
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
];
