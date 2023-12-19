import { Suspense, useRef, useState } from 'react';
import {
  Await,
  defer,
  redirect,
  useAsyncValue,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from 'react-router-dom';

import * as Dialog from '@radix-ui/react-dialog';
import * as S from './HomePage.styled';
import * as Icon from '@Icons/index';

import ContentCard from '@Page/Home/Components/ContentCard/ContentCard';
import HomeHeader from '@Components/HomeHeader';

import styled from '@emotion/styled';
import { TransitionDirection } from '@Page/Home/Components/ContentCard/ContentCard.types';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import Complimate from '@Components/Complimate';

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
  z-index: 99,
  willChange: 'opacity',
});

const DialogContent = styled(motion(Dialog.Content), {
  max-width: '18.75rem',
  width: '70%',
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
  const navigate = useNavigate();

  const initialData = useLoaderData();
  console.log({ initialData });
  const revalidator = useRevalidator();

  const [sideMenuRef, setSideMenuRef] = useState(null);
  const [drawerRef, setDrawerRef] = useState(null);

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

  const handleWriteClick = () => {
    navigate('/write');
    // redirect('/write');
  };

  const contentSectionVariants = {
    before: (direction: number) => ({ y: `${100 * direction}%` }),
    normal: { y: 0 },
    exit: (direction: number) => ({ y: `${-100 * direction}%` }),
  };

  const handleOpenChange = (open: boolean, afterAnimate?: () => void) => {
    if (!open) {
      Promise.all([
        animate(scope.current, { opacity: 0 }),
        animatee(scopee.current, { x: '-100%' }),
      ]).then(() => {
        setOpen(open);

        if (afterAnimate) afterAnimate();
      });
    }
  };

  const handleTransitionRaise = (transitionDirection: TransitionDirection, postLength: number) => {
    direction.current = transitionDirection;
    setCurrentCardIndex((prev) => wrap(0, postLength - 1, prev + transitionDirection));
  };

  return (
    <S.PageContainer>
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <HomeHeader
          onHamburgerClick={handleHamburgerClick}
          onRefreshClick={handleRefreshClick}
          onWriteClick={handleWriteClick}
        />

        <Dialog.Portal container={sideMenuRef}>
          <DialogOverlay ref={scope} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <DialogContent ref={scopee} initial={{ x: '-100%' }} animate={{ x: 0 }}>
              <S.SideBarInner>
                <S.SideBarHeader>
                  <div className="left">
                    <button onClick={() => handleOpenChange(false)}>
                      <Icon.Left
                        css={{
                          width: '$icon-menu',
                          height: '$icon-menu',
                          color: 'theme.colors.bg',
                        }}
                      />
                    </button>

                    <p>메뉴</p>
                  </div>

                  <button onClick={() => handleOpenChange(false, () => navigate('/setting'))}>
                    <Icon.Setting
                      css={{
                        width: '$icon-menu',
                        height: '$icon-menu',
                        lineHeight: '0',
                        color: 'theme.colors.bg',
                      }}
                    />
                  </button>
                </S.SideBarHeader>

                <S.MenuList>
                  <li className="selected">
                    <Icon.Home
                      css={{
                        width: '$icon-menu',
                        height: '$icon-menu',
                        lineHeight: '0',
                        color: '$point',
                      }}
                    />
                    홈
                  </li>
                  <li>
                    <Icon.Profile
                      css={{
                        width: '$icon-menu',
                        height: '$i;con-menu',
                        lineHeight: '0',
                      }}
                    />
                    내 피드
                  </li>
                  <li>
                    <Icon.Hamburger
                      css={{
                        width: '$icon-menu',
                        height: '$icon-menu',
                        lineHeight: '0',
                      }}
                    />
                    명예의 전당
                  </li>
                  <li>
                    <Icon.Hamburger
                      css={{
                        width: '$icon-menu',
                        height: '$icon-menu',
                        lineHeight: '0',
                      }}
                    />
                    추가 기능
                  </li>
                </S.MenuList>

                <footer>
                  <Icon.Logo
                    css={{
                      width: '$icon-sm',
                      height: '$icon-sm',
                    }}
                  />
                  <span>컴플리메이트</span>
                </footer>
              </S.SideBarInner>
            </DialogContent>
          </DialogOverlay>
        </Dialog.Portal>
      </Dialog.Root>

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
              <Await resolve={initialData?.posts} errorElement={<h1>Error</h1>}>
                <ResolvedContentCard
                  cardIndex={currentCardIndex}
                  onTransitionRaise={handleTransitionRaise}
                  drawerRef={drawerRef}
                />
              </Await>
            </Suspense>
          </S.ContentSection>
        </AnimatePresence>
      </S.ContentSectionWrapper>

      <section className="사이드메뉴" ref={setSideMenuRef} />
      <section className="댓글 Drawer" ref={setDrawerRef} />
    </S.PageContainer>
  );
};

/**
 * TODO: 나중에 데이터 API 연결할 때 현재 불러온 데이터와 지금 받아오는 데이터를 구분해야 함
 *
 * HOME 전체에는 현재까지 불러온 데이터가 존재하는 거고
 * 중간에 불러오는 데이터를 불러오면 이 아래 ResolvedContentCard에서 받아서 위에 저장해
 *
 * 초기 로딩시에만 스피너 가져오고, 아니면 새로고침을 눌렀을 때만 스피너 뜨게
 * 중간에 가져오는 데이터는 스피너 안 띄우기
 * -> 만약에 가져오는 게 실패하면 토스트 메시지 띄우기: 추가 칭찬하기를 가져오기를 실패했습니다
 *
 * ContentCard는 진짜 Post 한 개 데이터를 받아서 표출하는 Component가 되어야 함
 * 지금은 뭔가.. 뭔가임. 가져오는 데이터 자체가 posts라, cardIndex를 받아서 표현해주는 게 이상한 꼴이 됐다.
 * 아마 <Await>에는 그냥 가져오는 것만 하고 Await 밖에 ContentCard를 두는 것도 나을 듯?
 *
 * <Await resolve={requestedPosts}>
 *    <UpdatePostComponent />
 * </Await>
 *
 * <ContentCard {~} />
 *
 * 그런데 이 꼴 자체가 되게 웃기지 않아?
 *
 * -----------> 정리해보면
 *
 * 1. React Router Dom의 Loader 기능은 라우팅 전에 필요한 초기 데이터를 불러오는 용도가 적합.
 * ----> Rendering 이후에 추가적인 Fetching이 필요하다면 다른 접근이 필요
 *
 * 2. 그러므로, 당연하게도, React Router DOM은 라우팅에 관련된 패칭, 뮤테이트만 다뤄야 한다.
 * 3. 그 말은~? 지금 내가 원하는 무한 스크롤을 구현하려면 현재 구조는 글러먹었다는 뜻이다.
 *
 * -----------> revalidate에 대해서
 *
 * 찾아보다가 그러면 revalidate로 접근하면 안 되나? 싶은 생각이 들었는데 용도 자체가 좀 다른 듯
 * 이놈은 어떤 한 카테고리에 대해서 정보의 변경이 일어날 때, 그러니까 추가/삭제/수정이 일어났을 때 '재검증'을 해주는 것.
 * ----> TodoList 라는 카테고리가 있을 때, TodoList의 변경이 일어나면 새로운 데이터를 가져오는 것
 * 추가적인 데이터를 받아오기엔 부적합한 용도이고, 애초에 그런 그런 게 아니다.
 */

const ResolvedContentCard = ({ cardIndex, onTransitionRaise, drawerRef }) => {
  const posts = useAsyncValue();

  if (!posts) return;

  return (
    <ContentCard
      post={posts[cardIndex]}
      onTransitionRaise={(direction) => onTransitionRaise(direction, posts.length)}
      drawerRef={drawerRef}
    />
  );
};

export default HomePage;
