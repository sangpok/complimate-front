import LandingPage from '@Page/LandingPage';
import LoginPage, { action as loginAction } from '@Page/LoginPage';
import RegisterPage, { action as registerAction } from '@Page/RegisterPage';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Theme, ThemeProvider } from './Components/ThemeProvider';
import { globalStyle } from './Styles/_globals';
import { globalCss } from './stitches.config';
import TutorialPage from '@Page/TutorialPage';
import TestPage from '@Page/TestPage';
import HomePage from '@Page/HomePage';

const globalStyles = globalCss(globalStyle);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<LandingPage />} />
      <Route path="register" element={<RegisterPage />} action={registerAction} />
      <Route path="login" element={<LoginPage />} action={loginAction} />
      <Route path="tutorial" element={<TutorialPage />} />
      <Route path="test" element={<TestPage />} />
      <Route path="home" element={<HomePage />} />
    </Route>
  )
);

const App = () => {
  globalStyles();

  const theme: Theme = 'light';

  return (
    <ThemeProvider theme={theme}>
      <MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
        <AnimatePresence>
          <RouterProvider router={router} />
        </AnimatePresence>
      </MotionConfig>
    </ThemeProvider>
  );
};

export default App;
