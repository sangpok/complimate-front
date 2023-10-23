import { styled } from '@/stitches.config';
import { Text } from './Atomic';

import { AnimatePresence, motion } from 'framer-motion';

import { ReactComponent as LeftIconInner } from '@Icons/mdi_chevron-left.svg';
import { useState } from 'react';

const FixedHeaderContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$default',

  backgroundColor: '$bg',

  padding: '$double',

  // position: 'fixed',
  // top: 0,
  // left: 0,
  // width: '100%',
  // marginBottom: '$content',

  a: {
    all: 'unset',
    // display: 'inline-block',
    // lineHeight: 0,
  },

  button: {
    all: 'unset',
    lineHeight: 0,
  },
});

const LeftIcon = styled(LeftIconInner, {
  width: '$icon',
  height: '$icon',
});

const Title = styled(motion(Text), {
  position: 'absolute',
  top: 'auto',
  // height: '100%',
  // textAlign: 'center',
  // verticalAlign: 'center',
});

type FixedHeaderProp = {
  onPrevClick: () => void;
  title: string;
  nextButtonName: string;
  onNextClick: () => void;
};

const FixedHeader = ({ onPrevClick, title, onNextClick, nextButtonName }: FixedHeaderProp) => {
  const [moveDirection, setMoveDirection] = useState(1);

  const handlePrevClick = () => {
    setMoveDirection(-1);
    onPrevClick();
  };

  const handleNextClick = () => {
    setMoveDirection(1);
    onNextClick();
  };

  return (
    <FixedHeaderContainer>
      <button onClick={handlePrevClick}>
        <LeftIcon />
      </button>
      <div style={{ flex: 1, height: '1.3125rem', overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence custom={moveDirection} initial={false}>
          <Title
            key={title}
            type="header"
            custom={moveDirection}
            variants={{
              initial: (moveDirection) => ({ y: `${100 * moveDirection}%` }),
              normal: { y: 0 },
              exit: (moveDirection) => ({ y: `${-100 * moveDirection}%` }),
            }}
            initial="initial"
            animate="normal"
            exit="exit"
          >
            {title}
          </Title>
        </AnimatePresence>
      </div>
      <button onClick={handleNextClick}>
        <Text type="textButton">{nextButtonName}</Text>
      </button>
    </FixedHeaderContainer>
  );
};

export default FixedHeader;
