import RootLayout from '@Layouts/RootLayout';
import LandingPage from '@Page/LandingPage';
import LoginPage from '@Page/LoginPage';
import RegisterPage from '@Page/RegisterPage';
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
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
    </Route>
  )
);

const App = () => {
  globalStyles();

  const theme: Theme = 'light';

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
