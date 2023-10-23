import { styled } from '@/stitches.config';
import { Link } from 'react-router-dom';
import { Container, Text } from './Atomic';

import { ReactComponent as LeftIconInner } from '@Icons/mdi_chevron-left.svg';

const FixedHeaderContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$default',

  backgroundColor: '$bg',

  padding: '$double',

  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',

  a: {
    all: 'unset',
    // display: 'inline-block',
    // lineHeight: 0,
  },
});

const LeftIcon = styled(LeftIconInner, {
  width: '$icon',
  height: '$icon',
});

const Title = styled(Text, {
  flex: 1,
});

const FixedHeader = () => {
  return (
    <FixedHeaderContainer>
      {/* Prev */}
      <Link to=".." style={{ lineHeight: 0 }}>
        <LeftIcon />
      </Link>
      {/* Title */}
      <Title type="header">이메일 입력</Title>
      {/* Next */}
      <Link to="">
        <Text type="textButton">다음</Text>
      </Link>
    </FixedHeaderContainer>
  );
};

export default FixedHeader;
