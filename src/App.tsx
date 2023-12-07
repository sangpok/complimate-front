import { GlobalStyle } from '@Styles/_globals';
import { darkTheme, lightTheme } from '@Styles/theme';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './Routes';
import { MotionConfig } from 'framer-motion';

const motionTransition = { type: 'spring', bounce: 0, duration: 0.4 };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter(routes);

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
