import LandingPage from '@Page/LandingPage';
import LoginPage from '@Page/LoginPage';
import RegisterPage from '@Page/RegisterPage';
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

const globalStyles = globalCss(globalStyle);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route key="landing" index element={<LandingPage />} />
      <Route key="register" path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
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
