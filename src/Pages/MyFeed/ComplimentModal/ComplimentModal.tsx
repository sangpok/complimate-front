/** Style + Layout */
import * as S from './ComplimentModal.styled';
import { Tokens } from '@Styles/tokens';
const { space } = Tokens;

import { PaddingLayout } from '@Layouts/PaddingLayout';
import { VerticalLayout } from '@Layouts/VerticalLayout';

/** Icon */
import { Delete as DeleteIcon } from '@Icons/index';

/** Componenet */
import PostImageList from '@Components/PostImageList';
import { IconButton } from '@Components/IconButton';
import {
  AnimatedBackground,
  AnimatedBox,
  CommentBox,
  LikeBox,
  PostMetaInfo,
} from './ComplimentModal.components';

/** Hook */
import { useGetFeedPost } from '@Hooks/index';

/** Animation */
import { AnimatePresence, MotionConfig } from 'framer-motion';

/** Type */
import type {
  ComplimentModalProp,
  FeedPostPresneterProp,
  FeedPostProp,
} from './ComplimentModal.types';

const FeedPostPresneter = ({ post, comments }: FeedPostPresneterProp) => {
  const hasMedia = post.mediaUrlList.length !== 0;

  return (
    <VerticalLayout gap={space.default} wFull>
      <S.FeedPostContainer>
        <PostMetaInfo {...post} />
        {hasMedia && <PostImageList images={post.mediaUrlList} />}

        <S.PostTextContent>
          <p>{post.contents}</p>
        </S.PostTextContent>

        <LikeBox {...post} />
        <CommentBox postId={post.id} comments={comments} />
      </S.FeedPostContainer>
    </VerticalLayout>
  );
};

const FeedPost = ({ feedId }: FeedPostProp) => {
  const [postQuery, commentQuery] = useGetFeedPost(feedId);

  const { data: post, isPending: isPostPending } = postQuery;
  const { data: comments, isPending: isCommentPending } = commentQuery;

  const isLoading = isPostPending || isCommentPending;

  if (isLoading) {
    return 'loading ...';
  }

  return <FeedPostPresneter post={post!} comments={comments!} />;
};

export const ComplimentModal = ({ isShow, feedId, onClose }: ComplimentModalProp) => {
  return (
    <MotionConfig transition={{ duration: 0.3, ease: [0.12, 0, 0, 1] }}>
      <AnimatePresence>
        {isShow && (
          <AnimatedBackground onClick={onClose}>
            <AnimatedBox onClick={(e) => e.stopPropagation()}>
              <PaddingLayout.Default wFull>
                <S.ContentContainter>
                  <S.SelfRightAlign>
                    <IconButton onClick={onClose}>
                      <DeleteIcon />
                    </IconButton>
                  </S.SelfRightAlign>

                  <S.ScrollContainer>
                    <FeedPost feedId={feedId} />
                  </S.ScrollContainer>
                </S.ContentContainter>
              </PaddingLayout.Default>
            </AnimatedBox>
          </AnimatedBackground>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
};
