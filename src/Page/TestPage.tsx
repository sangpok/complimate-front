import { styled } from '@/stitches.config';
import React, { useState } from 'react';
import * as Icon from '@Icons/index';
import { Text } from '@Components/Atomic';
import { tutorials } from '@/tutorials';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FullPage = styled('div', {
  // position: 'relative',
});

const LogoWrapper = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$double',
  marginTop: '$quard',

  width: '100%',
  position: 'absolute',
  top: 0,
});

const Content = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100dvh',
  width: '100dvw',

  marginTop: '4rem',
  padding: '0 2rem',

  position: 'absolute',

  '& h1': {
    fontSize: '$tutorial-title',
    marginBottom: '$double',
  },

  '& p': {
    fontSize: '$tutorial-content',
    fontWeight: 600,
    lineHeight: '$tutorial-content',

    '& strong': {
      color: '$point',
    },
  },
});

const Nav = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$smaller',
  width: '100%',
  marginBottom: '$quard',

  position: 'absolute',
  bottom: 0,
});

const Circle = styled('div', {
  width: '$nav',
  height: '$nav',
  borderRadius: '999px',
  background: '$depth2',

  '&.selected': {
    background: '$point',
  },
});

const ButtonSection = styled(motion.div, {
  position: 'absolute',
  bottom: '0',
  width: '100%',
  padding: '0 $double',
  display: 'flex',
  marginBottom: 'calc($quard * 2)',
});

const StyledLink = styled(Link, {
  all: 'unset',

  width: '100%',
  fontSize: '$button-text',
  fontWeight: 700,
  padding: '$default $double',
  color: '$bg',
  background: '$point',
  textAlign: 'center',
  borderRadius: '$small',
  boxShadow: '0 0 10px 1px rgba(0, 0, 0, .2)',
});

const TestPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const isLastStep = currentIndex === tutorials.length - 1;
  const isFirstStep = currentIndex === 0;

  return (
    <FullPage>
      <LogoWrapper
        variants={{
          first: { y: '4rem', opacity: 1 },
          after: { y: 0, opacity: 1 },
        }}
        initial={{ opacity: 0 }}
        animate={currentIndex === 0 ? 'first' : 'after'}
      >
        <Icon.Logo />
        <Text type="logo">컴플리메이트</Text>
      </LogoWrapper>

      <AnimatePresence initial={false} custom={direction}>
        <Content
          key={currentIndex}
          custom={direction}
          variants={{
            initial: (direction) => ({ x: `${100 * direction}%` }),
            normal: { x: 0 },
            exit: (direction) => ({ x: `${-100 * direction}%` }),
          }}
          initial="initial"
          animate="normal"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, panInfo) => {
            const { offset, velocity } = panInfo;
            const currentDirection = offset.x < 0 ? 1 : -1;

            if (isFirstStep && currentDirection === -1) return;
            if (isLastStep && currentDirection === 1) return;

            setDirection(currentDirection);

            if (Math.abs(offset.x) > document.body.clientWidth / 2 || Math.abs(velocity.x) > 100) {
              setCurrentIndex((prev) => prev + currentDirection);
            }
          }}
        >
          <h1>{tutorials[currentIndex].title}</h1>
          <p>{tutorials[currentIndex].body}</p>
        </Content>
      </AnimatePresence>

      <Nav>
        {tutorials.map((_, index) => (
          <Circle className={index === currentIndex ? 'selected' : ''} />
        ))}
      </Nav>

      <ButtonSection
        variants={{
          hide: { y: '400%' },
          show: { y: 0 },
        }}
        initial={false}
        animate={currentIndex === tutorials.length - 1 ? 'show' : 'hide'}
      >
        <StyledLink to="/home">시작하기</StyledLink>
      </ButtonSection>
    </FullPage>
  );
};

export default TestPage;
