import React, { useRef } from 'react';
import * as S from './BestCommentList.styled';
import InlineProfile from '@Components/InlineProfile';
import useMeasure from 'react-use-measure';

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
  const [listRef, listBounds] = useMeasure();

  const bestCommentElements = bestComments.map((bestComment) => (
    <BestComment key={bestComment.id} comment={bestComment} />
  ));

  return (
    <S.BestCommentSection className="베댓">
      {/* <div className="베댓 Wrapper"> */}
      <S.ScrollBestCommentContainer
        drag="x"
        dragDirectionLock
        // onDragStart={(event) => event.stopImmediatePropagation()}
        // onDrag={(event) => event.stopImmediatePropagation()}
        onPointerDownCapture={(event) => event.preventDefault()}
        dragListener={bestComments.length !== 1}
        dragConstraints={{ left: -listBounds.width, right: 0 }}
      >
        <S.BestCommentListWrapper ref={listRef}>{bestCommentElements}</S.BestCommentListWrapper>
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
