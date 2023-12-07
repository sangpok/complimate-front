import { AnimatePresence, PanInfo } from 'framer-motion';

import * as S from './DraggablePost.styled';

import React, { useRef } from 'react';
import { TransitionDirection } from '../ContentCard/ContentCard.types';
import ContentCard from '../ContentCard/ContentCard';
import { DraggablePostProp } from './DraggablePost.types';
import DraggableComponent from '@Components/DraggableComponent';

const contentSectionVariants = {
  before: (direction: number) => ({ y: `${100 * direction}%` }),
  normal: { y: 0 },
  exit: (direction: number) => ({ y: `${-100 * direction}%` }),
};

export const DraggablePost = React.memo(
  ({ post, onTransitionRaise, onCommentClick, onHeartClick }: DraggablePostProp) => {
    const direction = useRef(TransitionDirection.Down);

    const handleDragEnd = (_: unknown, panInfo: PanInfo) => {
      const { offset, velocity } = panInfo;

      const curDirection = offset.y < 0 ? TransitionDirection.Up : TransitionDirection.Down;

      const offsetThreshold = document.body.clientHeight / 3;
      const veloctiyThreshold = 100;

      const overOffset = Math.abs(offset.y) > offsetThreshold;
      const overVelocity = Math.abs(velocity.y) > veloctiyThreshold;
      const couldTransition = overOffset || overVelocity;

      if (couldTransition) {
        direction.current = curDirection;
        onTransitionRaise(curDirection);
      }
    };

    return (
      <AnimatePresence custom={direction.current} initial={false}>
        <S.StyledDraggableComponent
          key={post.id}
          dragId="ContentCard"
          axis="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
          custom={direction.current}
          variants={contentSectionVariants}
          initial="before"
          animate="normal"
          exit="exit"
        >
          <ContentCard post={post} onCommentClick={onCommentClick} onHeartClick={onHeartClick} />
        </S.StyledDraggableComponent>
      </AnimatePresence>
    );
  }
);
