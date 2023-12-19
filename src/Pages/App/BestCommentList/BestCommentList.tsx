import React, { useEffect, useMemo, useState } from 'react';
import { BestCommentItemProp, BestCommentListProp } from './BestCommentList.types';
import { HorizontalLayout } from '@Layouts/HorizontalLayout';
import { VerticalLayout } from '@Layouts/VerticalLayout';

import { More as MoreIcon, Heart as HeartIcon } from '@Icons/index';

import * as S from './BestCommentList.styled';
import { IconButton } from '@Components/IconButton';

import { Tokens } from '@Styles/tokens';
import DraggableComponent from '@Components/DraggableComponent';
import { useAnimate } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { wrap } from '@Utils/index';
const { space, sizes } = Tokens;

const BestCommentItem = ({ writer, contents, likeCount, createdAt }: BestCommentItemProp) => {
  const { profileUrl, nickname } = writer;

  return (
    <S.ItemContainer>
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
        <IconButton style={{ width: '100%' }}>
          <HeartIcon width={sizes.icon.comment} />
          <span className="count">{likeCount}</span>
        </IconButton>
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

  const handleDragEnd = (event, panInfo) => {
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
