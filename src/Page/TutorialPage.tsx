import { tutorials } from '@/tutorials';
import { Text } from '@Components/Atomic';
import * as Icon from '@Icons/index';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import * as S from './TutorialPage.styled';

const TutorialPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const isLastStep = currentIndex === tutorials.length - 1;
  const isFirstStep = currentIndex === 0;

  return (
    <S.FullPage>
      <S.LogoWrapper
        variants={{
          first: { y: '4rem', opacity: 1 },
          after: { y: 0, opacity: 1 },
        }}
        initial={{ opacity: 0 }}
        animate={currentIndex === 0 ? 'first' : 'after'}
      >
        <Icon.Logo />
        <Text type="logo">컴플리메이트</Text>
      </S.LogoWrapper>

      <AnimatePresence initial={false} custom={direction}>
        <S.Content
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
        </S.Content>
      </AnimatePresence>

      <S.Nav>
        {tutorials.map((_, index) => (
          <S.Circle className={index === currentIndex ? 'selected' : ''} />
        ))}
      </S.Nav>

      <S.ButtonSection
        variants={{
          hide: { y: '400%' },
          show: { y: 0 },
        }}
        initial={false}
        animate={currentIndex === tutorials.length - 1 ? 'show' : 'hide'}
      >
        <S.StyledLink to="/home">시작하기</S.StyledLink>
      </S.ButtonSection>
    </S.FullPage>
  );
};

export default TutorialPage;
