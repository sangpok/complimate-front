import { useState } from 'react';

import { HorizontalLayout } from '@Layouts/HorizontalLayout';
import { ModalLayout } from '@Layouts/ModalLayout';
import { PageLayout } from '@Layouts/PageLayout';

import { Tokens } from '@Styles/tokens';
import * as S from './CommentDrawer.styled';
const { space, sizes } = Tokens;

import DraggableComponent from '@Components/DraggableComponent';
import { IconButton } from '@Components/IconButton';

import {
  Comment as CommentIcon,
  Delete as DeleteIcon,
  Enter as EnterIcon,
  HeartFill as HeartFillIcon,
  Heart as HeartIcon,
  More as MoreIcon,
  Sort as SortIcon,
} from '@Icons/index';

import { useCreateComment, useGetComments, useGetReplys, useLikeComment } from '@Hooks/index';
import { useDoubleTap } from '@Hooks/useDoubleTab';

import { AppStore, useAppStore } from '@Store/AppStore';
import { CommentStore, CommentSubmitMode, useCommentStore } from '@Store/CommentStore';

import type { Comment, CreateCommentRequest, Writer } from '@Types/index';
import type { PanInfo, Variants } from 'framer-motion';
import type { FormEvent } from 'react';
import useMeasure from 'react-use-measure';

const DrawerHead = () => {
  return (
    <S.DrawerHandle>
      <div className="handle" />
    </S.DrawerHandle>
  );
};

type CommentPresenterProp = {
  isReply?: boolean;
  onReplyShowClick?: () => void;
  onReplyModeClick?: () => void;
  onHeartClick?: () => void;
} & Comment;

const CommentPresenter = ({
  contents,
  createdAt,
  replyCount,
  likeCount,
  writer,
  isLiked,
  isReply,
  onReplyShowClick,
  onReplyModeClick,
  onHeartClick,
}: CommentPresenterProp) => {
  const { profileUrl, nickname } = writer;

  return (
    <S.ItemContainer>
      <HorizontalLayout.Root>
        <HorizontalLayout.Group gap={space.small}>
          <S.SmallCircleProfile url={`/profile/${profileUrl}`} />
          <strong>{nickname}</strong>
          <p className="date">
            {new Intl.RelativeTimeFormat('ko', { numeric: 'auto' }).format(
              Math.floor((createdAt - Number(new Date())) / (1000 * 60 * 60 * 24 * 30)),
              'month'
            )}
          </p>
        </HorizontalLayout.Group>

        <IconButton>
          <MoreIcon width={sizes.icon.comment} />
        </IconButton>
      </HorizontalLayout.Root>

      <div style={{ alignSelf: 'start', whiteSpace: 'pre-line' }}>{contents}</div>

      <S.CommentFootLayout>
        {!isReply && (
          <HorizontalLayout.Group gap={space.default}>
            {replyCount !== 0 && (
              <IconButton style={{ gap: space.small }} onClick={onReplyShowClick}>
                <CommentIcon width={sizes.icon.comment} />
                {replyCount}
              </IconButton>
            )}

            <IconButton style={{ gap: space.small }} onClick={onReplyModeClick}>
              <EnterIcon width={sizes.icon.comment} />
              답글달기
            </IconButton>
          </HorizontalLayout.Group>
        )}

        <IconButton style={{ gap: space.small, justifySelf: 'end' }} onClick={onHeartClick}>
          {isLiked ? (
            <HeartFillIcon width={sizes.icon.comment} />
          ) : (
            <HeartIcon width={sizes.icon.comment} />
          )}
          <span className="count">{likeCount}</span>
        </IconButton>
      </S.CommentFootLayout>
    </S.ItemContainer>
  );
};

type OriginCommentProp = {
  onReplyShowClick: () => void;
  comment: Comment;
};
const OriginComment = ({ onReplyShowClick, comment }: OriginCommentProp) => {
  const currentPostId = useAppStore<number>('currentPostId');
  const { mutate } = useLikeComment();

  const doubleTabCallback = useDoubleTap(() => {
    mutate({ postId: currentPostId, commentId: comment.id });
  });

  const handleHeartClick = () => {
    mutate({ postId: currentPostId, commentId: comment.id });
  };

  return (
    <CommentPresenter
      {...comment}
      {...doubleTabCallback}
      onReplyShowClick={onReplyShowClick}
      onReplyModeClick={() => CommentStore.changeModeToReply(comment)}
      onHeartClick={handleHeartClick}
    />
  );
};

type ReplyCommentProp = {
  currentPostId: number;
  comment: Comment;
};
const ReplyComment = ({ currentPostId, comment }: ReplyCommentProp) => {
  const { mutate } = useLikeComment();

  const doubleTabCallback = useDoubleTap(() => {
    mutate({ postId: currentPostId, commentId: comment.id });
  });

  const handleHeartClick = () => {
    mutate({ postId: currentPostId, commentId: comment.id });
  };

  return (
    <CommentPresenter isReply {...doubleTabCallback} {...comment} onHeartClick={handleHeartClick} />
  );
};

type CommentItemProp = { comment: Comment };
const CommentItem = ({ comment }: CommentItemProp) => {
  const [commentId, setCommentId] = useState<number | undefined>(undefined);
  const currentPostId = useAppStore<number>('currentPostId');

  const { data, isPending, isSuccess } = useGetReplys(currentPostId, commentId);
  const showReply = commentId !== undefined;

  const handleReplyShowClick = () => {
    setCommentId((prev) => (prev !== undefined ? undefined : comment.id));
  };

  return (
    <S.CommentLayout>
      <OriginComment comment={comment} onReplyShowClick={handleReplyShowClick} />

      {showReply && (
        <S.ReplyBox>
          {isPending && <p>Loading..</p>}
          {isSuccess &&
            data.map((reply) => (
              <ReplyComment
                key={`reply-${reply.id}`}
                currentPostId={currentPostId}
                comment={reply}
              />
            ))}
        </S.ReplyBox>
      )}
    </S.CommentLayout>
  );
};

const NoCommentsView = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h3 style={{ textAlign: 'center', marginBottom: space.small }}>아직 칭찬이 없네요😇</h3>
      <p style={{ textAlign: 'center' }}>첫 번째 칭찬을 달아보세요!</p>
    </div>
  );
};

type DrawerBodyProp = {
  comments?: Comment[];
};

const DrawerBody = ({ comments }: DrawerBodyProp) => {
  /**
   * framer-motion의 dragConstraints 버그 때문에 사이즈 변경이 일어나면 re-rendering 시켜줘야 함
   * : 자식의 사이즈 변경이 일어나도 dragConstraints는 초기에 설정한 값으로 지정됨
   */
  const [bodyScope, bodyBounds] = useMeasure();

  if (comments === undefined) {
    return 'Loading';
  }

  const hasComments = comments.length !== 0;
  const hasNoComments = comments.length === 0;

  return (
    <DraggableComponent dragId="commentBody" axis="y">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }} ref={bodyScope}>
        <HorizontalLayout.Root style={{ marginBottom: space.double }}>
          <h2>총 {comments.length}개의 칭찬</h2>

          <S.SortButton>
            <SortIcon />
            공감순
          </S.SortButton>
        </HorizontalLayout.Root>

        {hasNoComments && <NoCommentsView />}
        {hasComments && (
          <ul>
            {comments.map((comment) => (
              <CommentItem key={`comment-${comment.id}`} comment={comment} />
            ))}
          </ul>
        )}
      </div>
    </DraggableComponent>
  );
};

type ReplyModeViewProp = Writer;
const ReplyModeView = ({ profileUrl, nickname }: ReplyModeViewProp) => {
  return (
    <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
      <IconButton onClick={() => CommentStore.clearReplyMode()}>
        <DeleteIcon />
      </IconButton>

      <HorizontalLayout.Group>
        <S.SmallCircleProfile url={`/profile/${profileUrl}`} />
        <strong>{nickname}</strong>
        {/* <p className="description">님에게 답글달기</p> */}
      </HorizontalLayout.Group>
    </div>
  );
};

const DrawerFoot = () => {
  const submitMode = useCommentStore<CommentSubmitMode>('submitMode');
  const replyTarget = useCommentStore<Comment | null>('replyTarget');
  const currentPostId = useAppStore<number>('currentPostId');

  const { mutate } = useCreateComment();

  const isReplyMode = submitMode === 'reply';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const postData = Object.fromEntries(formData) as Pick<CreateCommentRequest, 'contents'>;

    if (isReplyMode) {
      mutate(
        {
          ...postData,
          postId: currentPostId,
          parentId: replyTarget!.id,
        },
        {
          onSuccess() {
            CommentStore.clearReplyMode();
          },
        }
      );
    } else {
      mutate({
        ...postData,
        postId: currentPostId,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset style={{ display: 'flex', marginTop: space.default }} disabled={false}>
        <S.WriteSection className="글박스">
          <S.InputBoxWrapper className="입력섹션">
            {isReplyMode && <ReplyModeView {...replyTarget!.writer} />}
            <input name="contents" placeholder="최고야~" required />
          </S.InputBoxWrapper>

          <button>작성</button>
        </S.WriteSection>
      </fieldset>
    </form>
  );
};

const backgroundVariants: Variants = {
  hide: { y: '100%' },
  show: { y: 0 },
};

const variantBinding = {
  initial: 'hide',
  animate: 'show',
  exit: 'hide',
};

const topAndBottomConstraints = { top: 0, bottom: 0 };

export const CommentDrawer = () => {
  const isCommentDrawerOpen = useAppStore<boolean>('isCommentDrawerOpen');
  const currentPostId = useAppStore<number>('currentPostId');

  const { data: comments, isPending } = useGetComments(currentPostId);

  if (isPending) {
    return;
  }

  const handleDragEnd = (_: unknown, panInfo: PanInfo) => {
    const { offset, velocity } = panInfo;

    const curDirection = offset.y < 0 ? -1 : 1;

    const offsetThreshold = document.body.clientHeight / 3;
    const veloctiyThreshold = 100;

    const overOffset = Math.abs(offset.y) > offsetThreshold;
    const overVelocity = Math.abs(velocity.y) > veloctiyThreshold;
    const couldTransition = overOffset || overVelocity;

    if (couldTransition && curDirection === 1) {
      cleanUpCommentDrawer();
    }
  };

  const cleanUpCommentDrawer = () => {
    CommentStore.clearReplyMode();
    AppStore.hideCommentDrawer();
  };

  return (
    <ModalLayout shouldShow={isCommentDrawerOpen} onClose={() => cleanUpCommentDrawer()}>
      <S.Background
        axis="y"
        dragId="commentDrawer"
        dragConstraints={topAndBottomConstraints}
        variants={backgroundVariants}
        {...variantBinding}
        onClick={(e) => e.stopPropagation()}
        onDragEnd={handleDragEnd}
      >
        <PageLayout
          head={<DrawerHead />}
          body={<DrawerBody comments={comments} />}
          foot={<DrawerFoot />}
        />
      </S.Background>
    </ModalLayout>
  );
};
