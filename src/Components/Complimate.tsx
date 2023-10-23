import React from 'react';

import { ReactComponent as LogoInner } from '../Icons/complimate-logo.svg';
import { Text } from './Atomic/Text';
import { styled } from '../stitches.config';

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
