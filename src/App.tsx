import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import HomePage, { loader as homeLoader } from '@Page/HomePage';
import LandingPage from '@Page/LandingPage';
import LoginPage, { action as loginAction } from '@Page/LoginPage';
import RegisterPage, { action as registerAction } from '@Page/RegisterPage';
import TestPage from '@Page/TestPage';
import TutorialPage from '@Page/TutorialPage';

import { MotionConfig } from 'framer-motion';

import { Suspense } from 'react';
import { Theme, ThemeProvider } from './Components/ThemeProvider';
import { globalStyle } from './Styles/_globals';
import { globalCss } from './stitches.config';

const globalStyles = globalCss(globalStyle);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<LandingPage />} />
      <Route path="register" element={<RegisterPage />} action={registerAction} />
      <Route path="login" element={<LoginPage />} action={loginAction} />
      <Route path="tutorial" element={<TutorialPage />} />
      <Route path="test" element={<TestPage />} />
      <Route
        path="home"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <HomePage />
          </Suspense>
        }
        errorElement={<h1>Loading...</h1>}
        loader={homeLoader}
      />
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
