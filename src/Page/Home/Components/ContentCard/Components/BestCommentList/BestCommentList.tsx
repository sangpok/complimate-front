import React, { useEffect, useRef, useState } from 'react';
import * as S from './BestCommentList.styled';
import InlineProfile from '@Components/InlineProfile';
import useMeasure from 'react-use-measure';
import DraggableComponent from '@Components/DraggableComponent';
import { useAnimate } from 'framer-motion';

const wrap = (min: number, max: number, value: number) => {
  if (value < min) return min;
  if (value > max) return max;

  return value;
};

const BestComment = React.memo(({ comment }) => {
  return (
    <S.FixedWidth>
      <S.BestCardContent className="베댓 카드 콘텐츠">
        <S.BestCommentHeader className="베댓 카드 정보 및 메뉴">
          <S.BestCommentInfo className="베댓 정보">
            <InlineProfile type="normal" nickname={comment.author} profile={comment.profile} />
            <S.Time>{comment.date}</S.Time>
          </S.BestCommentInfo>

          <S.CommentMenu className="메뉴">
            <S.MoreIcon />
          </S.CommentMenu>
        </S.BestCommentHeader>

        <S.CommentBody className="베댓 본문">{comment.body}</S.CommentBody>
        <S.CommentLike className="베댓 좋아요">
          <S.HeartIcon />
          <span>{comment.stickerCount}</span>
        </S.CommentLike>
      </S.BestCardContent>
    </S.FixedWidth>
  );
});

const BestCommentList = React.memo(({ bestComments, onMoreClick }) => {
  const contaienrRef = useRef<HTMLDivElement>(null);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [commentListScope, animateCommentList] = useAnimate();

  const bestCommentElements = bestComments.map((bestComment) => (
    <BestComment key={bestComment.id} comment={bestComment} />
  ));

  useEffect(() => {
    animateCommentList(
      commentListScope.current,
      {
        // x: `calc(-${100 * currentImageIndex}% - (${currentImageIndex} * ${space.default}))`,
        // x: `-${(imageWrapperBounds.width * currentImageIndex) / 16 + currentImageIndex * 0.75}rem`,
        x: `-${100 * currentCommentIndex}%`,
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
      setCurrentCommentIndex((prev) => wrap(0, bestComments.length - 1, prev + curDirection));
    }
  };

  return (
    <S.BestCommentSection className="베댓">
      {/* <div className="베댓 Wrapper"> */}
      <S.ScrollBestCommentContainer
      // drag="x"
      // dragDirectionLock
      // dragConstraints={{ left: -listBounds.width, right: 0 }}
      >
        {/* Comment가 1개면 일반 Container
            Comment가 여러개면 DraggableComponent
          */}
        <S.StyledDraggableComponent
          dragId="BestCommentList"
          axis="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          dragListener={bestComments.length !== 1}
        >
          <div ref={commentListScope}>{bestCommentElements}</div>
        </S.StyledDraggableComponent>
      </S.ScrollBestCommentContainer>
      {/* </div> */}

      <S.MoreButton onClick={onMoreClick}>
        <S.CommentIcon />
        <span>{bestComments.length}개의 댓글 더 보기</span>
      </S.MoreButton>
    </S.BestCommentSection>
  );
});

export default BestCommentList;
