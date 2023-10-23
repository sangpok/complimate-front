import { ReactComponent as LogoInner } from '../Icons/complimate-logo.svg';
import { styled } from '../stitches.config';
import { Text } from './Atomic/Text';

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'cetner',
  alignItems: 'center',
  gap: '$smaller',
});

const Logo = styled(LogoInner, {
  width: '$logo-sm',
  height: '$logo-sm',
});

const Complimate = () => {
  return (
    <Wrapper>
      <Logo />
      <Text type="logo">컴플리메이트</Text>
    </Wrapper>
  );
};

export default Complimate;
