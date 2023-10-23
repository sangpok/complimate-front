import { Box, Button, Container, Text } from './Components/Atomic';

import Complimate from './Components/Complimate';
import { Theme, ThemeProvider } from './Components/ThemeProvider';
import { globalCss, styled } from './stitches.config';
import { globalStyle } from './Styles/_globals';

import { ReactComponent as GoogleIconInner } from './Icons/google.svg';

const globalStyles = globalCss(globalStyle);

const InitialContainer = styled(Container, {
  marginTop: '$quard',
  alignItems: 'center',
});

const GoogleIcon = styled(GoogleIconInner, {
  width: '$icon-sm',
  height: '$icon-sm',
});

const App = () => {
  globalStyles();

  const theme: Theme = 'light';

  return (
    <ThemeProvider theme={theme}>
      <InitialContainer spacing="lg">
        <Complimate />

        <Box>
          <Text type="caption">우리의 컴플리메이트가 되어주세요!</Text>
          <Button size="lg">3단계로 끝내는 회원가입</Button>
        </Box>

        <Box>
          <Text type="caption">이미 계정이 있으신가요?</Text>
          <Button size="lg">이메일로 로그인하기</Button>
          <Button size="lg" type="google" icon={<GoogleIcon />}>
            구글로 로그인하기
          </Button>
        </Box>
      </InitialContainer>
    </ThemeProvider>
  );
};

export default App;
