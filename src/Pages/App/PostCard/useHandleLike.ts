import { useLikePost } from '@Hooks/index';
import { AppStore, useAppStore } from '@Store/AppStore';
import { PostLike } from '@Types/index';
import React from 'react';

export const useHandleLike = () => {
  const currentPostId = useAppStore<number>('currentPostId');
  const postLikeMeta = useAppStore<
    | {
        prevLike?: PostLike;
        newLike: PostLike;
      }
    | undefined
  >('postLikeMeta');

  const { mutate } = useLikePost();

  const makeLike = () => {
    if (currentPostId === null || postLikeMeta === undefined) {
      return;
    }

    const { prevLike, newLike } = postLikeMeta;

    mutate({ postId: currentPostId, likeType: postLikeMeta.newLike.likeType });

    if (prevLike && prevLike.likeType !== newLike.likeType) {
      AppStore.showLikeAnimation();
      setTimeout(() => AppStore.endLikeAnimation(), 1300);
    }
  };
  return { makeLike };
};
