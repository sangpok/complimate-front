import { styled } from '@/stitches.config';

import { Box, Button, Container, Text } from '@Components/Atomic';
import { buttonStyles } from '@Components/Atomic/Button';
import Complimate from '@Components/Complimate';

import { ReactComponent as GoogleIconInner } from '@Icons/google.svg';

import { Link } from 'react-router-dom';

const LandingContainer = styled(Container, {
  alignItems: 'center',
  gap: '$quard',
  marginTop: '$quard',
});

const GoogleIcon = styled(GoogleIconInner, {
  width: '$icon-sm',
  height: '$icon-sm',
});

const StyledLink = styled(Link, buttonStyles);

const LandingPage = () => {
  return (
    <LandingContainer>
      <Complimate />

      <Box>
        <Text type="caption">우리의 컴플리메이트가 되어주세요!</Text>
        <StyledLink to="register" size="lg">
          3단계로 끝내는 회원가입
        </StyledLink>
      </Box>

      <Box>
        <Text type="caption">이미 계정이 있으신가요?</Text>
        <StyledLink to="login" size="lg">
          이메일로 로그인하기
        </StyledLink>
        <Button size="lg" type="google" icon={<GoogleIcon />}>
          구글로 로그인하기
        </Button>
      </Box>
    </LandingContainer>
  );
};

export default LandingPage;
