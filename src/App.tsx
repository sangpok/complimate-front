import { useState } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigation,
  useOutlet,
} from 'react-router-dom';

import HomePage, { loader as homeLoader } from '@Page/Home/HomePage';
import LandingPage from '@Page/Landing/LandingPage';
import LoginPage, { action as loginAction } from '@Page/Login/LoginPage';
import RegisterPage, { action as registerAction } from '@Page/Register/RegisterPage';
import SettingPage from '@Page/Setting/SettingPage';
import TestPage from '@Page/Test/TestPage';
import TutorialPage from '@Page/Tutorial/TutorialPage';
import WritePage, { action as writeAction } from '@Page/Write/WritePage';

import { AnimatePresence, MotionConfig, motion } from 'framer-motion';

import { ThemeProvider } from '@emotion/react';
import { darkTheme, lightTheme } from '@Styles/theme';
import { GlobalStyle } from '@Styles/_globals';
import MyFeedPage from '@Page/MyFeed/MyFeedPage';

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
      <Route path="home" element={<HomePage />} loader={homeLoader} />
      <Route path="write" element={<WritePage />} action={writeAction} />
      <Route path="setting" element={<SettingPage />} />
      <Route path="myfeed" element={<MyFeedPage />} />
      {/* <Route path="test" element={<TestPage />} /> */}
    </Route>
  )
);

const motionTransition = { type: 'spring', bounce: 0, duration: 0.4 };

const App = () => {
  // globalStyles();

  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <MotionConfig transition={motionTransition}>
          <RouterProvider router={router} />
        </MotionConfig>
      </ThemeProvider>
    </>
  );
};

export default App;
