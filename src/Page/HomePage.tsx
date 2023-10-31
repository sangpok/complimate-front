import { Suspense, useRef, useState } from 'react';
import { Await, defer, useLoaderData, useRevalidator } from 'react-router-dom';

import * as Dialog from '@radix-ui/react-dialog';
import * as S from './HomePage.styled';

import ContentCard from '@Components/ContentCard';
import HomeHeader from '@Components/HomeHeader';

import { styled } from '@/stitches.config';
import { TransitionDirection } from '@Components/ContentCard.types';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';

// 저가요 오늘요 무슨일이잇엇냐면요 맨날 부끄러워서 ㅋㅋ 발표도잘 못하고 그랫는데 선생님이시켜서 발표햇어요

// 근데요 저가막 말하니까 애들이 웃어서 기분이 조앗어욬ㅋㅋㅋ

//그래 우리 재민이가 부끄러운데도 발표를 해서 친구들을 웃겨줬다니 기분이 좋았겠구나 아줌마는 회사에서 부장한테 웃기지도 않는 농담을 듣고 웃어야 해서 기분이 안 좋아요~

const DialogOverlay = styled(motion(Dialog.Overlay), {
  background: 'rgba(0 0 0 / 0.5)',
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  zIndex: 99,
  willChange: 'opacity',
});

const DialogContent = styled(motion(Dialog.Content), {
  maxWidth: '70%',
  height: '100%',
  background: 'white',
  padding: '30px',
  willChange: 'transform',
});

const wrap = (min: number, max: number, value: number) => {
  if (value < min) return min;
  if (value > max) return max;

  return value;
};

export async function loader() {
  return defer({ posts: fetch('./dummy_datas.json').then((res) => res.json()) });
}

const HomePage = () => {
  const { posts } = useLoaderData() as { posts: unknown };
  const revalidator = useRevalidator();

  const [open, setOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const [scope, animate] = useAnimate();
  const [scopee, animatee] = useAnimate();

  const direction = useRef(TransitionDirection.Down);

  const handleHamburgerClick = () => {
    setOpen(true);
  };
  const handleRefreshClick = () => {
    direction.current = TransitionDirection.Down;
    setCurrentCardIndex(0);
    revalidator.revalidate();
  };
  const handleWriteClick = () => {};

  const contentSectionVariants = {
    before: (direction: number) => ({ y: `${100 * direction}%` }),
    normal: { y: 0 },
    exit: (direction: number) => ({ y: `${-100 * direction}%` }),
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      Promise.all([
        animate(scope.current, { opacity: 0 }),
        animatee(scopee.current, { x: '-100%' }),
      ]).then(() => {
        setOpen(open);
      });
    }
  };

  return (
    <S.PageContainer>
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <HomeHeader
          onHamburgerClick={handleHamburgerClick}
          onRefreshClick={handleRefreshClick}
          onWriteClick={handleWriteClick}
        />

        <S.ContentSectionWrapper>
          <AnimatePresence custom={direction.current} initial={false}>
            <S.ContentSection
              key={currentCardIndex}
              custom={direction.current}
              variants={contentSectionVariants}
              initial="before"
              animate="normal"
              exit="exit"
            >
              <Suspense fallback={<h1>Loading...</h1>}>
                <Await resolve={posts}>
                  {(resolvedPosts) => {
                    console.log(resolvedPosts);

                    const handleTransitionRaise = (transitionDirection: TransitionDirection) => {
                      direction.current = transitionDirection;
                      setCurrentCardIndex((prev) =>
                        wrap(0, resolvedPosts.length - 1, prev + transitionDirection)
                      );
                    };

                    return (
                      <ContentCard
                        post={resolvedPosts[currentCardIndex]}
                        onTransitionRaise={handleTransitionRaise}
                      />
                    );
                  }}
                </Await>
              </Suspense>
            </S.ContentSection>
          </AnimatePresence>
        </S.ContentSectionWrapper>

        <Dialog.Portal>
          <DialogOverlay ref={scope} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <DialogContent ref={scopee} initial={{ x: '-100%' }} animate={{ x: 0 }}>
              뭘봐ㅋㅋ
            </DialogContent>
          </DialogOverlay>
        </Dialog.Portal>

        {/* <section className="사이드메뉴" ref={setSideMenuContainer} /> */}
      </Dialog.Root>
    </S.PageContainer>
  );
};

export default HomePage;
