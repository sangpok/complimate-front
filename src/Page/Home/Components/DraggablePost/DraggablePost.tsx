import { AnimatePresence } from 'framer-motion';

import * as S from './DraggablePost.styled';

import { useRef } from 'react';
import { TransitionDirection } from '../ContentCard/ContentCard.types';
import ContentCard from '../ContentCard/ContentCard';
import { DraggablePostProp } from './DraggablePost.types';

const contentSectionVariants = {
  before: (direction: number) => ({ y: `${100 * direction}%` }),
  normal: { y: 0 },
  exit: (direction: number) => ({ y: `${-100 * direction}%` }),
};

export const DraggablePost = ({
  post,
  onTransitionRaise,
  drawerRef,
  onCommentClick,
}: DraggablePostProp) => {
  const direction = useRef(TransitionDirection.Down);

  const handleTransitionRaise = (newDirection: TransitionDirection) => {
    direction.current = newDirection;
    onTransitionRaise(newDirection);
  };

  return (
    <AnimatePresence custom={direction.current} initial={false}>
      <S.ContentSection
        key={post.id}
        custom={direction.current}
        variants={contentSectionVariants}
        initial="before"
        animate="normal"
        exit="exit"
      >
        <ContentCard
          post={post}
          onTransitionRaise={handleTransitionRaise}
          drawerRef={drawerRef}
          onCommentClick={onCommentClick}
        />
      </S.ContentSection>
    </AnimatePresence>
  );
};
