/** React Query */
import { QueryClient } from '@tanstack/react-query';

/** Layout */
import { PageLayout } from '@Layouts/PageLayout';

/** Component */
import { AppHeader } from './AppHeader';
import { ParticleAnimate } from './AppPage.components';
import { Skeleton } from './AppPage.skeleton';
import { CommentDrawer } from './CommentDrawer';
import { PostCard } from './PostCard';
import { SideMenu } from './SideMenu';

/** Animation */
import { SnapTransition } from '@Animations/index';

/** Hook */
import { useGetPosts } from '@Hooks/index';

/** API */
import * as API from '@API/index';

/** Store */
import { AppStore, useAppStore } from '@Store/AppStore';

/** Type */
import { ComplementPost, type LikeType } from '@Types/index';
import { useEffect, useState } from 'react';

export const loader = (queryClient: QueryClient) => async () => {
  return (
    queryClient.getQueryData(['posts']) ??
    queryClient.fetchQuery({ queryKey: ['posts'], queryFn: () => API.getPosts(0) })
  );
};

type PostCardWrapperProp = {
  post: ComplementPost;
  onTransition: (transition: number) => void;
};
const PostCardWrapper = ({ post, onTransition }: PostCardWrapperProp) => {
  const newLikeType = useAppStore<LikeType | null>('newLikeType');

  const showLikeAnimation = newLikeType !== null;

  return (
    <>
      <SnapTransition>
        {/* 
        PostCard 내에서 바로 post를 받아오면, SnapTransition의 이전/다음이 같은 포스트가 되어 진행되므로
        받아서 보내줌. 그래야 Framer Motion에서 제대로 된 SnapShot을 받음
        */}
        <PostCard post={post} onTransition={onTransition} />
      </SnapTransition>
      {showLikeAnimation && <ParticleAnimate likeType={newLikeType} />}
    </>
  );
};

const AppBody = () => {
  const lastViewId = useAppStore<number>('lastViewId');
  const currentPostIndex = useAppStore<number>('currentPostIndex');

  const { data: posts, isPending } = useGetPosts(lastViewId);

  const [post, setPost] = useState<ComplementPost | null>(posts ? posts[currentPostIndex] : null);

  useEffect(() => {
    if (posts === undefined) return;

    const tmpPost = posts[currentPostIndex];

    setPost(tmpPost);
    AppStore.setCurrentPostId(tmpPost.id);
  }, [posts, currentPostIndex]);

  if (isPending || !posts) {
    return <Skeleton />;
  }

  const handleTransition = (transition: number) => {
    const isNext = transition === 1;
    const isPrev = transition === -1;
    const isNotOverflow = currentPostIndex < posts.length - 1;
    const isNotUnderflow = currentPostIndex > 0;

    if (isNext && isNotOverflow) return AppStore.nextPost();
    if (isPrev && isNotUnderflow) return AppStore.prevPost();
  };

  return post && <PostCardWrapper post={post} onTransition={handleTransition} />;
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
