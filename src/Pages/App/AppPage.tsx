import { TransitionDirection } from '@Pages/App/Components/ContentCard/ContentCard.types';
import { useAnimate } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import * as Header from '@Components/HomeHeader';
import * as Layout from '@Layouts/DefaultLayout';
import * as Dialog from '@radix-ui/react-dialog';
import * as C from './Components';
import * as S from './AppPage.styled';
import { v4 as uuid } from 'uuid';

const commentList = [
  {
    id: uuid(),
    name: '박봉자',
    profile: './tet.jpg',
    date: '4시간 전',
    body: '으아아악',
    heartCount: 48,
    replys: [
      {
        id: uuid(),
        name: '박봉자',
        profile: './tet.jpg',
        date: '4시간 전',
        body: 'ㅋㅋㅋㅋ',
        heartCount: 48,
      },
      {
        id: uuid(),
        name: '박봉자',
        profile: './tet.jpg',
        date: '4시간 전',
        body: 'ㅋㅋㅋㅋ',
        heartCount: 48,
      },
    ],
  },
  {
    id: uuid(),
    name: '박봉자',
    profile: './tet.jpg',
    date: '4시간 전',
    body: '으아아악',
    heartCount: 48,
    replys: [
      {
        id: uuid(),
        name: '박봉자',
        profile: './tet.jpg',
        date: '4시간 전',
        body: 'ㅋㅋㅋㅋ',
        heartCount: 48,
      },
      {
        id: uuid(),
        name: '박봉자',
        profile: './tet.jpg',
        date: '4시간 전',
        body: 'ㅋㅋㅋㅋ',
        heartCount: 48,
      },
    ],
  },
];

const wrap = (min: number, max: number, value: number) => {
  if (value < min) return min;
  if (value > max) return max;

  return value;
};

export async function loader({ request }) {
  return await fetch('./dummy_datas.json').then((res) => res.json());
}

export const AppPage = () => {
  const posts = useLoaderData();

  console.log({ posts });

  const navigate = useNavigate();

  const [overlayScope, animateOverlay] = useAnimate();
  const [contentScope, animateContent] = useAnimate();
  const [drawerScope, animateDrawer] = useAnimate();

  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isCommentDrawerOpen, setIsCommentDrawerOpen] = useState(false);

  // const contentCardParentRef = useRef<HTMLDivElement>(null);

  const sideMenuRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  const handleHamburgerClick = useCallback(() => {
    setIsSideMenuOpen(true);
  }, [setIsSideMenuOpen]);

  const handleRefreshClick = useCallback(() => {
    setCurrentPostIndex(0);
  }, [setCurrentPostIndex]);

  const handleWriteClick = useCallback(() => {
    navigate('/write');
  }, [navigate]);

  const handleTransitionRaise = (transitionDirection: TransitionDirection) => {
    setCurrentPostIndex((prev) => wrap(0, posts.length - 1, prev + transitionDirection));
  };

  const handleCommentClick = useCallback(() => {
    setIsCommentDrawerOpen(true);
  }, [setIsCommentDrawerOpen]);

  const closeSidebar = (afterAnimate?: () => void) => {
    Promise.all([
      animateOverlay(overlayScope.current, { opacity: 0 }),
      animateContent(contentScope.current, { x: '-100%' }),
    ]).then(() => {
      setIsSideMenuOpen(false);

      if (afterAnimate) afterAnimate();
    });
  };

  const closeCommentDrawer = (afterAnimate?: () => void) => {
    Promise.all([animateDrawer(drawerScope.current, { y: '100%' })]).then(() => {
      setIsCommentDrawerOpen(false);

      if (afterAnimate) afterAnimate();
    });
  };

  const handleSidebarOpenChange = (open: boolean) => {
    if (!open) {
      closeSidebar();
    }
  };

  const handleCommentDrawerOpenChange = (open: boolean) => {
    if (!open) {
      closeCommentDrawer();
    }
  };

  const handleCommentItemClick = (id: number, type: string) => {
    console.log({ id, type });
  };

  const handleSortClick = (sortType: string) => {
    console.log(sortType);
  };

  const handleHaertClick = (id: string) => {
    console.log({ id });
  };

  const handleMenuItemClick = (path: string) => {
    // 테스트용 코드
    if (path === 'myfeed') {
      closeSidebar(() => navigate(path));
    } else {
      closeSidebar(() => console.log(`item clicked: ${path}`));
    }
  };

  if (!posts) return;

  return (
    <Layout.Root>
      <Layout.Head>
        <Header.Root>
          <Header.Hamburger onClick={handleHamburgerClick} />
          <Header.Group>
            <Header.Refresh onClick={handleRefreshClick} />
            <Header.Write onClick={handleWriteClick} />
          </Header.Group>
        </Header.Root>
      </Layout.Head>

      <S.LayoutBody>
        <S.BodyLayout>
          <C.DraggablePost
            post={posts[currentPostIndex]}
            onTransitionRaise={handleTransitionRaise}
            onCommentClick={handleCommentClick}
            onHeartClick={handleHaertClick}
          />
        </S.BodyLayout>
      </S.LayoutBody>

      <Dialog.Root open={isSideMenuOpen} onOpenChange={handleSidebarOpenChange}>
        <C.SideBarMenu
          container={sideMenuRef}
          overlayScope={overlayScope}
          contentScope={contentScope}
          onBackClick={() => closeSidebar(() => console.log('back clicked'))}
          onSettingClick={() => closeSidebar(() => navigate('/setting'))}
          onMenuItemClick={handleMenuItemClick}
        />
      </Dialog.Root>

      <Dialog.Root open={isCommentDrawerOpen} onOpenChange={handleCommentDrawerOpenChange}>
        <C.CommentDrawer
          comments={commentList}
          container={drawerRef.current}
          drawerScope={drawerScope}
          onCommentItemClick={handleCommentItemClick}
          onSortClick={handleSortClick}
          onClose={() => closeCommentDrawer()}
        />
      </Dialog.Root>

      <section className="사이드메뉴" ref={sideMenuRef} />
      <section className="댓글 Drawer" ref={drawerRef} />
    </Layout.Root>
  );
};
