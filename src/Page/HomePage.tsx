import * as Layout from '@Layouts/DefaultLayout';
import * as Header from '@Components/HomeHeader';
import * as C from './HomePage.component';
import * as Dialog from '@radix-ui/react-dialog';
import { LegacyRef, useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AnimatePresence, useAnimate } from 'framer-motion';
import { TransitionDirection } from '@Components/ContentCard.types';

const commentList = [
  {
    id: 0,
    name: '박봉자',
    profile: './tet.jpg',
    date: '4시간 전',
    body: '으아아악',
    heartCount: 48,
    replys: [
      {
        id: 0,
        name: '박봉자',
        profile: './tet.jpg',
        date: '4시간 전',
        body: 'ㅋㅋㅋㅋ',
        heartCount: 48,
      },
      {
        id: 1,
        name: '박봉자',
        profile: './tet.jpg',
        date: '4시간 전',
        body: 'ㅋㅋㅋㅋ',
        heartCount: 48,
      },
    ],
  },
  {
    id: 0,
    name: '박봉자',
    profile: './tet.jpg',
    date: '4시간 전',
    body: '으아아악',
    heartCount: 48,
    replys: [
      {
        id: 0,
        name: '박봉자',
        profile: './tet.jpg',
        date: '4시간 전',
        body: 'ㅋㅋㅋㅋ',
        heartCount: 48,
      },
      {
        id: 1,
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

const HomePage = () => {
  const posts = useLoaderData();

  const navigate = useNavigate();

  const [overlayScope, animateOverlay] = useAnimate();
  const [contentScope, animateContent] = useAnimate();
  const [drawerScope, animateDrawer] = useAnimate();

  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isCommentDrawerOpen, setIsCommentDrawerOpen] = useState(false);

  const sideMenuRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  const handleHamburgerClick = () => {
    setIsSideMenuOpen(true);
  };

  const handleRefreshClick = () => {};

  const handleWriteClick = () => {
    navigate('/write');
  };

  const handleTransitionRaise = (transitionDirection: TransitionDirection) => {
    setCurrentPostIndex((prev) => wrap(0, posts.length - 1, prev + transitionDirection));
  };

  const handleCommentClick = () => {
    setIsCommentDrawerOpen(true);
  };

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

      <Layout.Body>
        <C.DraggablePost
          post={posts[currentPostIndex]}
          onTransitionRaise={handleTransitionRaise}
          drawerRef={drawerRef.current}
          onCommentClick={handleCommentClick}
        />
      </Layout.Body>

      <Dialog.Root open={isSideMenuOpen} onOpenChange={handleSidebarOpenChange}>
        <C.SideBarMenu
          container={sideMenuRef}
          overlayScope={overlayScope}
          contentScope={contentScope}
          onBackClick={() => closeSidebar(() => console.log('back clicked'))}
          onSettingClick={() => closeSidebar(() => console.log('setting clicked'))}
          onMenuItemClick={(path) => closeSidebar(() => console.log(`item clicked: ${path}`))}
        />
      </Dialog.Root>

      <Dialog.Root open={isCommentDrawerOpen} onOpenChange={handleCommentDrawerOpenChange}>
        <C.CommentDrawer
          comments={commentList}
          container={drawerRef.current}
          drawerScope={drawerScope}
        />
      </Dialog.Root>

      <section className="사이드메뉴" ref={sideMenuRef} />
      <section className="댓글 Drawer" ref={drawerRef} />
    </Layout.Root>
  );
};

export default HomePage;
