import { useState } from 'react';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigation,
  useOutlet,
} from 'react-router-dom';

import AppPage, { loader as homeLoader } from '@Pages/App/AppPage';
import LandingPage from '@Pages/Landing/LandingPage';
import LoginPage, { action as loginAction } from '@Pages/Login/LoginPage';
import RegisterPage, { action as registerAction } from '@Pages/Register/RegisterPage';
import SettingPage from '@Pages/Setting/SettingPage';
import TestPage from '@Pages/Test/TestPage';
import TutorialPage from '@Pages/Tutorial/TutorialPage';
import WritePage, { action as writeAction } from '@Pages/Write/WritePage';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AnimatePresence, MotionConfig, motion } from 'framer-motion';

import { ThemeProvider } from '@emotion/react';
import { darkTheme, lightTheme } from '@Styles/theme';
import { GlobalStyle } from '@Styles/_globals';
import MyFeedPage from '@Pages/MyFeed/MyFeedPage';

// import { Theme, ThemeProvider } from './Components/ThemeProvider';
// import { globalStyle } from './Styles/_globals';
// import { globalCss } from './stitches.config';

// const globalStyles = globalCss(globalStyle);

const AnimatedOutlet = () => {
  const o = useOutlet();
  const outlet = useState(o);

  return <>{outlet}</>;
};

const Layout = () => {
  const navigation = useNavigation();

  return (
    <AnimatePresence initial={false} mode="wait">
      {/* <p>{location.pathname}</p> */}
      <motion.div
        key={navigation.location?.pathname || location.pathname}
        initial={{ opacity: 0, x: '100px' }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.5,
          },
        }}
        exit={{
          opacity: 0,
          x: '-100px',
          transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.4,
          },
        }}
      >
        <div
          style={{
            width: '100dvw',
            height: '100dvh',
            boxShadow: '-50px 0 50px 1px rgba(0, 0, 0, .3)',
          }}
        >
          <AnimatedOutlet />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="register" element={<RegisterPage />} action={registerAction} />
      <Route path="login" element={<LoginPage />} action={loginAction} />
      <Route path="tutorial" element={<TutorialPage />} />
      <Route path="home" element={<AppPage />} loader={homeLoader} />
      <Route path="write" element={<WritePage />} action={writeAction} />
      <Route path="setting" element={<SettingPage />} />
      <Route path="myfeed" element={<MyFeedPage />} />
      {/* <Route path="test" element={<TestPage />} /> */}
    </Route>
  )
);

const routes = (isLoggedIn) => [
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/dashboard" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/login" /> },
    ],
  },
  {
    path: '/app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/account', element: <Account /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      {
        path: 'member',
        element: <Outlet />,
        children: [
          { path: '/', element: <MemberGrid /> },
          { path: '/add', element: <AddMember /> },
        ],
      },
    ],
  },
];

const routes =
  createBrowserRouter([
    {
      path: '/',
      element: hasAuth ? <Navigate to="/app" /> : <LandingLayout />,
      children: [
        {
          index: true,
          element: <LandingPage />
        },
        {
          path: 'login',
          element: <LoginPage />
        },
        {
          path: 'register',
          element: <RegisterPage />
        }
      ]
    },
    {
      path: '/app',
      element: hasAuth ? <AppLayout /> : <Navigate to="/login" />,
      children: [
        {
          index: true,
          element: <MainPage />
        },
        {
          path: "tutorial",
          element: <TutorialPage />
        },
        {
          path: "write",
          element: <WritePage />
        },
        {
          path: "myfeed",
          element: <MyFeedPage />
        },
        {
          path: "setting",
          element: <SettingLayout />,
          children: [
            {
              index: true,
              element: <SettingPage />
            },
            {
              path: 'nickname'
              element: <TempPage />
            },
            {
              path: 'introduce'
              element: <TempPage />
            },
            {
              path: 'handle_id'
              element: <TempPage />
            },
            {
              path: 'password'
              element: <TempPage />
            },
            {
              path: 'theme'
              element: <TempPage />
            },
            {
              path: 'font_size'
              element: <TempPage />
            },
            {
              path: 'logout'
              element: <TempPage />
            },
            {
              path: 'resigin'
              element: <TempPage />
            },
          ]
        },
      ]
    }
  ]);

const motionTransition = { type: 'spring', bounce: 0, duration: 0.4 };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <MotionConfig transition={motionTransition}>
            <RouterProvider router={router} />
          </MotionConfig>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
