import { Tokens } from '@Styles/tokens';
const { sizes, space } = Tokens;

import * as Layout from '@Layouts/DefaultLayout';
import * as Icon from '@Icons/index';
import * as S from './LandingPage.styled';
import * as C from './LandingPage.components';
import { Container } from '@Components/Atomic';
import { Flex } from '@Components/Atomic/Flex';

export const LandingPage = () => {
  return (
    <Container>
      <Flex direction="column" align="center" gap={space.quard} pt={space.quard}>
        <Layout.Head>
          <Flex justify="center" align="center" gap={space.smaller}>
            <Icon.Logo width={sizes.logo.small} height={sizes.logo.small} />
            <S.LogoText>컴플리메이트</S.LogoText>
          </Flex>
        </Layout.Head>

        <Flex gap={space.default}>
          <S.CaptionText>우리의 컴플리메이트가 되어주세요!</S.CaptionText>
          <S.RegisterButton to="/register" replace>
            3단계로 끝내는 회원가입
          </S.RegisterButton>
        </Flex>

        <Flex gap={space.default}>
          <S.CaptionText>이미 계정이 있으신가요?</S.CaptionText>
          <S.RegisterButton to="/login" replace>
            이메일로 로그인하기
          </S.RegisterButton>
          <C.GoogleButton to="/app" replace>
            구글로 로그인하기
          </C.GoogleButton>
        </Flex>
      </Flex>
    </Container>

    //  <PageTransition>
    // <LandingContainer>
    //   <Complimate />

    //    <Box>
    //     <Text type="caption">우리의 컴플리메이트가 되어주세요!</Text>
    //     <StyledLink to="register" size="sm">
    //       3단계로 끝내는 회원가입
    //     </StyledLink>
    //   </Box>

    //   <Box>
    //     <Text type="caption">이미 계정이 있으신가요?</Text>
    //     <StyledLink to="login" size="sm">
    //       이메일로 로그인하기
    //     </StyledLink>
    //     <Button size="sm" type="google" icon={<Icon.Google />}>
    //       구글로 로그인하기
    //     </Button>

    //     <Link to="/test">TEST</Link>
    //   </Box>
    //  </LandingContainer>
    // </PageTransition>
  );
};
