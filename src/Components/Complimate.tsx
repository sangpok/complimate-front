import { ReactComponent as LogoInner } from '../Icons/complimate-logo.svg';
// import { styled } from '../stitches.config';
import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
const { sizes, space } = Tokens;

const Wrapper = styled.div`
  display: 'flex';
  flexdirection: 'row';
  justifycontent: 'cetner';
  alignitems: 'center';
  gap: ${space.smaller};
`;

const Logo = styled(LogoInner)`
  width: ${sizes.logo.small};
  height: ${sizes.logo.small};
`;

const Complimate = () => {
  return (
    <Wrapper>
      <Logo />
      {/* <Text type="logo">컴플리메이트</Text> */}
    </Wrapper>
  );
};

export default Complimate;
