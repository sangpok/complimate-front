/** Style 및 Layout */
import { Tokens } from '@Styles/tokens';
import * as S from './PostCard.styled';
const { space } = Tokens;

import { HorizontalLayout } from '@Layouts/HorizontalLayout';
import { PaddingLayout } from '@Layouts/PaddingLayout';
import { PageLayout } from '@Layouts/PageLayout';

/** Component */
import DraggableComponent from '@Components/DraggableComponent';
import PostImageList from '@Components/PostImageList';
import { BestCommentList } from '../BestCommentList';
import { LikeButtonWithList } from '../LikeButtonWithList';

/** Icon */
import { Comment as CommentIcon } from '@Icons/index';

/** Hook */
import { useLikePost } from '@Hooks/index';
import { useDoubleTap } from '@Hooks/useDoubleTab';

/** Store */
import { AppStore } from '@Store/AppStore';

/** Type */
import type { ComplementPost, PostLike } from '@Types/index';
import type { PanInfo } from 'framer-motion';
import type { HeartButtonProp, PostCardProp, WrtierPresenterProp } from './PostCard.types';

const HeartButton = ({ totalLikeCount, likeList, id: postId }: HeartButtonProp) => {
  const { mutate } = useLikePost();

  const handleSelectLike = (prevLike: PostLike | undefined, newLike: PostLike) => {
    mutate({ likeType: newLike.likeType, postId });

    if (prevLike?.likeType !== newLike.likeType) {
      AppStore.setNewLikeType(newLike.likeType);
      setTimeout(() => AppStore.clearNewLikeType(), 1300);
    }
  };

  return (
    /** 스냅 동작 방지 */
    <S.HeartButtonContainer onPointerDown={(e) => e.stopPropagation()}>
      <LikeButtonWithList
        likeCount={totalLikeCount}
        likeList={likeList}
        onSelectLike={handleSelectLike}
      />
    </S.HeartButtonContainer>
  );
};

const PostMetaInfo = ({ writer, createdAt }: WrtierPresenterProp) => {
  const { profileUrl, nickname } = writer;

  return (
    <S.WriterLayout>
      <div className="writer">
        <S.SmallCircleProfile url={`/profile/${profileUrl}`} />
        <span className="nickname">
          <strong>{nickname}</strong>
          님으로부터
        </span>
      </div>

      <p className="time">{new Date(+createdAt).toLocaleString()}</p>
    </S.WriterLayout>
  );
};

const CardHeader = ({ post }: { post: ComplementPost }) => {
  return (
    <>
      <HorizontalLayout.Root style={{ marginBottom: space.default }}>
        <PostMetaInfo {...post} />
        <HeartButton {...post} />
      </HorizontalLayout.Root>
    </>
  );
};

const CardBody = ({ post }: { post: ComplementPost }) => {
  const { mutate } = useLikePost();

  const doubleTabCallback = useDoubleTap(() => {
    const prevLike = post.likeList.find(({ isLiked }) => isLiked);

    mutate({ postId: post.id, likeType: 'LIKE' });

    const isFirstLike = prevLike === undefined;
    const isChangedLike = prevLike && prevLike.likeType !== 'LIKE';
    const wouldAnimate = isFirstLike || isChangedLike;

    if (wouldAnimate) {
      // TODO: 모듈? Store? 암튼 Trigger Event Handler 만들기
      // LikeAnimationHandler.start("LIKE") 같은 느낌으로
      AppStore.setNewLikeType('LIKE');
      setTimeout(() => AppStore.clearNewLikeType(), 1300);
    }
  });

  return (
    <>
      <div style={{ height: '100%' }} {...doubleTabCallback}>
        <DraggableComponent dragId="ContentBody" axis="y">
          {post.mediaUrlList.length !== 0 && <PostImageList images={post.mediaUrlList} />}

          <S.PostTextContent>
            <p>{post.contents}</p>
          </S.PostTextContent>
        </DraggableComponent>
      </div>
    </>
  );
};

const CardFoot = ({ post }: { post: ComplementPost }) => {
  return (
    <>
      <S.FooterContainer>
        <BestCommentList {...post} />
        <S.MoreButton onClick={() => AppStore.showCommentDrawer()}>
          <CommentIcon />
          {post.totalCommentCount}개의 댓글 모두보기
        </S.MoreButton>
      </S.FooterContainer>
    </>
  );
};

export const PostCard = ({ post, onTransition }: PostCardProp) => {
  const handleDragEnd = (_: unknown, panInfo: PanInfo) => {
    const { offset, velocity } = panInfo;

    const curDirection = offset.y < 0 ? 1 : -1;
    const overOffset = Math.abs(offset.y) > document.body.clientHeight / 3;
    const overVelocity = Math.abs(velocity.y) > 100;
    const couldTransition = overOffset || overVelocity;

    if (couldTransition) {
      onTransition(curDirection);
    }
  };

  return (
    <DraggableComponent
      style={{ height: '100%' }}
      dragId="PostCard"
      axis="y"
      onDragEnd={handleDragEnd}
    >
      <PaddingLayout.SideDouble hFull>
        <PageLayout
          head={<CardHeader post={post} />}
          body={<CardBody post={post} />}
          foot={<CardFoot post={post} />}
        />
      </PaddingLayout.SideDouble>
    </DraggableComponent>
  );
};
