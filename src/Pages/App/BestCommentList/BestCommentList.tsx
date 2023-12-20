import DraggableComponent from '@Components/DraggableComponent';
import { IconButton } from '@Components/IconButton';
import { Heart as HeartIcon, HeartFill as HeartFillIcon, More as MoreIcon } from '@Icons/index';
import { HorizontalLayout } from '@Layouts/HorizontalLayout';
import { Tokens } from '@Styles/tokens';
import { wrap } from '@Utils/index';
import { PanInfo, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import useMeasure from 'react-use-measure';
import * as S from './BestCommentList.styled';
import { BestCommentItemProp, BestCommentListProp } from './BestCommentList.types';
import { useLikeComment } from '@Hooks/index';
import { useAppStore } from '@Store/AppStore';
const { space, sizes } = Tokens;
import { motion } from 'framer-motion';
import { useDoubleTap } from '@Hooks/useDoubleTab';

const BestCommentItem = ({
  id,
  writer,
  contents,
  likeCount,
  createdAt,
  isLiked,
}: BestCommentItemProp) => {
  const [heartScope, animateHeart] = useAnimate();
  const currentPostId = useAppStore<number>('currentPostId');
  const { mutate } = useLikeComment();

  const { profileUrl, nickname } = writer;

  const doubleTabCallback = useDoubleTap(() => {
    mutate({ postId: currentPostId, commentId: id });
    startHeartAnimation();
  });

  const startHeartAnimation = () => {
    animateHeart(
      heartScope.current,
      {
        scale: [1, 0.9, 1],
      },
      {
        duration: 0.5,
        ease: 'easeInOut',
      }
    );
  };

  const handleHeartClick = () => {
    mutate({ postId: currentPostId, commentId: id });
    startHeartAnimation();
  };

  return (
    <S.ItemContainer {...doubleTabCallback}>
      <HorizontalLayout.Root>
        <HorizontalLayout.Group gap={space.small}>
          <S.SmallCircleProfile url={`/profile/${profileUrl}`} />
          <strong>{nickname}</strong>
          <p className="date">
            {new Intl.RelativeTimeFormat('ko', { numeric: 'auto' }).format(
              Math.floor((createdAt - Number(new Date())) / (1000 * 60 * 60 * 24)),
              'days'
            )}
          </p>
        </HorizontalLayout.Group>

        <IconButton>
          <MoreIcon />
        </IconButton>
      </HorizontalLayout.Root>

      <div style={{ alignSelf: 'start', whiteSpace: 'pre-line' }}>{contents}</div>

      <div style={{ width: '100%' }}>
        <motion.div ref={heartScope}>
          <IconButton style={{ width: '100%', gap: space.small }} onClick={handleHeartClick}>
            {isLiked ? (
              <HeartFillIcon width={sizes.icon.comment} />
            ) : (
              <HeartIcon width={sizes.icon.comment} />
            )}
            <span className="count">{likeCount}</span>
          </IconButton>
        </motion.div>
      </div>
    </S.ItemContainer>
  );
};

export const BestCommentList = ({ bestCommentList }: BestCommentListProp) => {
  const [viewportRef, viewportBounds] = useMeasure();

  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [commentListScope, animateCommentList] = useAnimate();

  const viewportWidth = viewportBounds.width;
  const profileItemWidth = (103.33 * viewportWidth) / 100; // 100(vw) + 3.33(vw)

  useEffect(() => {
    animateCommentList(
      commentListScope.current,
      {
        x: -currentCommentIndex * profileItemWidth,
      },
      { type: 'spring', bounce: 0, duration: 0.4 }
    );
  }, [currentCommentIndex]);

  const handleDragEnd = (_: unknown, panInfo: PanInfo) => {
    const { offset, velocity } = panInfo;

    const curDirection = offset.x < 0 ? 1 : -1;
    const overOffset = Math.abs(offset.x) > document.body.clientWidth / 2;
    const overVelocity = Math.abs(velocity.x) > 400;
    const couldTransition = overOffset || overVelocity;

    if (couldTransition) {
      setCurrentCommentIndex((prev) => wrap(0, bestCommentList.length - 1, prev + curDirection));
    }
  };

  return (
    <div style={{ width: '100%' }} ref={viewportRef}>
      <DraggableComponent
        dragId="BestCommentList"
        axis="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        dragListener={bestCommentList.length >= 2}
      >
        <div ref={commentListScope} style={{ whiteSpace: 'nowrap' }}>
          {bestCommentList.map((comment) => (
            <BestCommentItem key={`bestcomment-${comment.id}`} {...comment} />
          ))}
        </div>
      </DraggableComponent>
    </div>
  );
};
