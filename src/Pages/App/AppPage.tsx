import { QueryClient } from '@tanstack/react-query';

import { PageLayout } from '@Layouts/PageLayout';

import { AppHeader } from './AppHeader';
import { PostCard } from './PostCard';
import { Skeleton } from './AppPage.skeleton';
import { SideMenu } from './SideMenu';

import { SnapTransition } from '@Animations/index';

import { useGetPosts } from '@Hooks/index';

import * as API from '@API/index';

import { AppStore, useAppStore } from '@Store/AppStore';
import { CommentDrawer } from './CommentDrawer';
import { useGetCurrentPost } from '@Hooks/useGetCurrentPost';
import { LikeType } from '@Types/index';
import Lottie from 'lottie-react';
import paricleLottie from '@Animations/Lottie/particles.json';

import { motion } from 'framer-motion';
export const loader = (queryClient: QueryClient) => async () => {
  return (
    queryClient.getQueryData(['posts']) ??
    queryClient.fetchQuery({ queryKey: ['posts'], queryFn: () => API.getPosts(0) })
  );
};

// TODO: 어쨌든 새로 누른 LikeType에 대한 정보를 얻어올 수 있어야 함...
const ParticleAnimate = ({ likeType }: { likeType: LikeType }) => {
  // const currentPost = useGetCurrentPost();

  const likeMap = {
    LIKE: { icon: '👍', name: '최고야' },
    PRAY: { icon: '🙏', name: '응원해' },
    LAUGH_WITH_SAD: { icon: '🤣', name: '뒤집어져' },
    HEART_EYES: { icon: '😍', name: 'OMG' },
    ANGEL_SMILE: { icon: '😇', name: '기절이야' },
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100dvw',
          height: '100dvh',
          zIndex: 99,
          display: 'grid',
          placeContent: 'center',
          willChange: 'transform',
        }}
      >
        <Lottie animationData={paricleLottie} style={{ width: '110dvw', height: '110dvh' }} />
      </div>

      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100dvw',
          height: '100dvh',
          zIndex: 99,
          display: 'grid',
          placeContent: 'center',
          willChange: 'transform',
        }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.7, 1], y: [50, 0] }}
        transition={{ duration: 1.3, ease: 'linear' }}
      >
        <div>
          <p style={{ fontSize: '10rem', textAlign: 'center' }}>{likeMap[likeType].icon}</p>
          <p style={{ fontSize: '3rem', fontWeight: 900, textAlign: 'center' }}>
            {likeMap[likeType].name}
          </p>
        </div>
      </motion.div>
    </>
  );
};

const AppBody = () => {
  const lastViewId = useAppStore<number>('lastViewId');
  const currentPostIndex = useAppStore<number>('currentPostIndex');
  const newLikeType = useAppStore<LikeType | null>('newLikeType');

  const showLikeAnimation = newLikeType !== null;

  const { data: posts, isPending } = useGetPosts(lastViewId);

  if (isPending || !posts) {
    return <Skeleton />;
  }

  const post = posts[currentPostIndex];
  AppStore.setCurrentPostId(post.id);

  const handleTransition = (transition: number) => {
    if (transition === 1 && currentPostIndex < posts.length - 1) {
      AppStore.nextPost();
    } else if (transition === -1 && currentPostIndex > 0) {
      AppStore.prevPost();
    }
  };

  return (
    <>
      <SnapTransition>
        {/* 
        PostCard 내에서 바로 post를 받아오면, SnapTransition의 이전/다음이 같은 포스트가 되어 진행되므로
        AppPage에서 받아서 보내줌. 그래야 Framer Motion에서 제대로 된 SnapShot을 받음
        */}
        <PostCard post={post} onTransition={handleTransition} />
      </SnapTransition>
      {showLikeAnimation && <ParticleAnimate likeType={newLikeType} />}
    </>
  );
};

export const AppPage = () => {
  return (
    <>
      <PageLayout head={<AppHeader />} body={<AppBody />} />
      <SideMenu />
      <CommentDrawer />
    </>
  );
};
