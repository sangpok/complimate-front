import { darkTheme, lightTheme, styled } from '../stitches.config';

export type Theme = 'light' | 'dark';

const FixedContainer = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100dvw',
  height: '100dvh',
});

type ThemeProviderProp = {
  theme?: Theme;
  children?: React.ReactNode;
};

export const ThemeProvider = ({ theme, children }: ThemeProviderProp) => {
  if (theme === 'light') {
    return <FixedContainer className={lightTheme}>{children}</FixedContainer>;
  }

  return <FixedContainer className={darkTheme}>{children}</FixedContainer>;
};
