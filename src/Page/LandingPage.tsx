import { styled } from '@/stitches.config';

import { Box, Button, Container, Text } from '@Components/Atomic';
import { buttonStyles } from '@Components/Atomic/Button';
import Complimate from '@Components/Complimate';
import PageTransition from '@Components/PageTransition';

import { Link } from 'react-router-dom';

import * as Icon from '@Icons/index';

const LandingContainer = styled(Container, {
  alignItems: 'center',
  gap: '$quard',
  marginTop: '$quard',
});

const StyledLink = styled(Link, buttonStyles);

const LandingPage = () => {
  return (
    <PageTransition>
      <LandingContainer>
        <Complimate />

        <Box>
          <Text type="caption">우리의 컴플리메이트가 되어주세요!</Text>
          <StyledLink to="register" size="sm">
            3단계로 끝내는 회원가입
          </StyledLink>
        </Box>

        <Box>
          <Text type="caption">이미 계정이 있으신가요?</Text>
          <StyledLink to="login" size="sm">
            이메일로 로그인하기
          </StyledLink>
          <Button size="sm" type="google" icon={<Icon.Google />}>
            구글로 로그인하기
          </Button>

          <Link to="/home">TEST</Link>
        </Box>
      </LandingContainer>
    </PageTransition>
  );
};

export default LandingPage;
