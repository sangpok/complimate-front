import { useState } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigation,
  useOutlet,
} from 'react-router-dom';

import HomePage, { loader as homeLoader } from '@Page/HomePage';
import LandingPage from '@Page/LandingPage';
import LoginPage, { action as loginAction } from '@Page/LoginPage';
import RegisterPage, { action as registerAction } from '@Page/RegisterPage';
import SettingPage from '@Page/SettingPage';
import TestPage from '@Page/TestPage';
import TutorialPage from '@Page/TutorialPage';
import WritePage, { action as writeAction } from '@Page/WritePage';

import { AnimatePresence, MotionConfig, motion } from 'framer-motion';

import { Theme, ThemeProvider } from './Components/ThemeProvider';
import { globalStyle } from './Styles/_globals';
import { globalCss } from './stitches.config';

const AnimatedOutlet = () => {
  const o = useOutlet();
  const outlet = useState(o);

  return <>{outlet}</>;
};

const globalStyles = globalCss(globalStyle);

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
      <Route path="test" element={<TestPage />} />
    </Route>
  )
);

const motionTransition = { type: 'spring', bounce: 0, duration: 0.4 };

const App = () => {
  globalStyles();

  const theme: Theme = 'light';

  return (
    <ThemeProvider theme={theme}>
      <MotionConfig transition={motionTransition}>
        <RouterProvider router={router} />
      </MotionConfig>
    </ThemeProvider>
  );
};

export default App;
