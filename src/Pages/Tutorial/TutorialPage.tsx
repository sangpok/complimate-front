import { tutorials } from '@/tutorials';
// import { Text } from '@Components/Atomic';
import * as Icon from '@Icons/index';
import { AnimatePresence, PanInfo } from 'framer-motion';
import { useState } from 'react';

import * as S from './TutorialPage.styled';

const logoVariant = {
  initial: { opacity: 0 },
  first: { y: '4rem', opacity: 1 },
  after: { y: 0, opacity: 1 },
};

const contentVariant = {
  initial: (direction: number) => ({ x: `${100 * direction}%` }),
  normal: { x: 0 },
  exit: (direction: number) => ({ x: `${-100 * direction}%` }),
};

const buttonVariant = {
  hide: { y: '400%' },
  show: { y: 0 },
};

export const TutorialPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const isLastStep = currentIndex === tutorials.length - 1;
  const isFirstStep = currentIndex === 0;

  const handleDragEnd = (_: unknown, panInfo: PanInfo) => {
    const { offset, velocity } = panInfo;
    const currentDirection = offset.x < 0 ? 1 : -1;

    if (isFirstStep && currentDirection === -1) return;
    if (isLastStep && currentDirection === 1) return;

    setDirection(currentDirection);

    const isOverOffset = Math.abs(offset.x) > document.body.clientWidth / 2;
    const isOverVelocity = Math.abs(velocity.x) > 100;
    const couldTransition = isOverOffset || isOverVelocity;

    if (couldTransition) {
      setCurrentIndex((prev) => prev + currentDirection);
    }
  };

  return (
    <S.FullPage>
      <S.LogoWrapper
        variants={logoVariant}
        initial="initial"
        animate={currentIndex === 0 ? 'first' : 'after'}
      >
        <S.LogoIcon />
        {/* <Icon.Logo width="250px" height="250px" /> */}
        {/* <Text type="logo">컴플리메이트</Text> */}
      </S.LogoWrapper>

      <AnimatePresence initial={false} custom={direction}>
        <S.Content
          key={currentIndex}
          custom={direction}
          variants={contentVariant}
          initial="initial"
          animate="normal"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          <h1>{tutorials[currentIndex].title}</h1>
          <p>{tutorials[currentIndex].body}</p>
        </S.Content>
      </AnimatePresence>

      <S.Nav>
        {tutorials.map((_, index) => (
          <S.Circle className={index === currentIndex ? 'selected' : ''} />
        ))}
      </S.Nav>

      <S.ButtonSection
        variants={buttonVariant}
        initial={false}
        animate={currentIndex === tutorials.length - 1 ? 'show' : 'hide'}
      >
        <S.StyledLink to="/app" replace>
          시작하기
        </S.StyledLink>
      </S.ButtonSection>
    </S.FullPage>
  );
};
