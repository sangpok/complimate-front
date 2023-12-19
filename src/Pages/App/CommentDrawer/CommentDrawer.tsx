/** @jsxImportSource @emotion/react */

import { useCreateComment, useGetComments, useGetReplys } from '@Hooks/index';
import { ModalLayout } from '@Layouts/ModalLayout';
import { PageLayout } from '@Layouts/PageLayout';
import { AppStore, useAppStore } from '@Store/AppStore';
import React, { FormEvent, useState, useSyncExternalStore } from 'react';

import * as S from './CommentDrawer.styled';
import { DragControls, useDragControls } from 'framer-motion';
import { Comment, CreateCommentRequest } from '@Types/index';
import { HorizontalLayout } from '@Layouts/HorizontalLayout';
import { IconButton } from '@Components/IconButton';
import {
  Sort as SortIcon,
  More as MoreIcon,
  Heart as HeartIcon,
  Comment as CommentIcon,
  Delete as DeleteIcon,
  Enter as EnterIcon,
} from '@Icons/index';

import { Tokens } from '@Styles/tokens';
import { VerticalLayout } from '@Layouts/VerticalLayout';
import { CommentStore, CommentSubmitMode, useCommentStore } from '@Store/CommentStore';
import DraggableComponent from '@Components/DraggableComponent';
import useMeasure from 'react-use-measure';
const { space, sizes } = Tokens;

type DrawerHeadProp = {
  dragControls: DragControls;
};

const DrawerHead = ({ dragControls }: DrawerHeadProp) => {
  return (
    <S.DrawerHandle onPointerDown={(e) => dragControls.start(e)}>
      <div className="handle" />
    </S.DrawerHandle>
  );
};

type CommentPresenterProp = {
  isReply?: boolean;
  onReplyShowClick?: () => void;
  onReplyModeClick?: () => void;
} & Comment;

const CommentPresenter = ({
  contents,
  createdAt,
  replyCount,
  likeCount,
  writer,
  isReply,
  onReplyShowClick,
  onReplyModeClick,
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

        <IconButton style={{ gap: space.small, justifySelf: 'end' }}>
          <HeartIcon width={sizes.icon.comment} />
          <span className="count">{likeCount}</span>
        </IconButton>
      </S.CommentFootLayout>
    </S.ItemContainer>
  );
};

type CommentItemProp = { comment: Comment };
const CommentItem = ({ comment }: CommentItemProp) => {
  const [commentId, setCommentId] = useState<number | undefined>(undefined);
  const currentPostId = useAppStore<number>('currentPostId');

  const { data, isPending, isSuccess } = useGetReplys(currentPostId, commentId);
  const showReply = commentId !== undefined;

  return (
    <S.CommentLayout>
      <CommentPresenter
        {...comment}
        onReplyShowClick={() =>
          setCommentId((prev) => (prev !== undefined ? undefined : comment.id))
        }
        onReplyModeClick={() => CommentStore.changeModeToReply(comment)}
      />
      {showReply && (
        <S.ReplyBox>
          {isPending && <p>Loading..</p>}
          {isSuccess &&
            data.map((comment) => (
              <CommentPresenter key={`reply-${comment.id}`} {...comment} isReply />
            ))}
        </S.ReplyBox>
      )}
    </S.CommentLayout>
  );
};

type DrawerBodyProp = {
  comments?: Comment[];
};

const DrawerBody = ({ comments }: DrawerBodyProp) => {
  const [drawerContentRef, drawerContentBounds] = useMeasure();
  if (comments === undefined) {
    return 'Loading';
  }

  const handleDragEnd = (event, panInfo) => {};

  return (
    <DraggableComponent dragId="commentBody" axis="y" onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <HorizontalLayout.Root style={{ marginBottom: space.double }}>
          <h2>총 {comments.length}개의 칭찬</h2>

          <S.SortButton>
            <SortIcon />
            공감순
          </S.SortButton>
        </HorizontalLayout.Root>

        {comments.length === 0 && (
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
        )}

        {comments.length !== 0 && (
          <ul ref={drawerContentRef}>
            {comments.map((comment) => (
              // <li key={`comment-${comment.id}`}>{comment.contents}</li>
              <CommentItem key={`comment-${comment.id}`} comment={comment} />
            ))}
          </ul>
        )}
      </div>
    </DraggableComponent>
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

    console.log({ postData });

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
            {isReplyMode && (
              <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <IconButton onClick={() => CommentStore.clearReplyMode()}>
                  <DeleteIcon />
                </IconButton>

                <HorizontalLayout.Group>
                  <S.SmallCircleProfile url={`/profile/${replyTarget!.writer.profileUrl}`} />
                  <strong>{replyTarget!.writer.nickname}</strong>
                  {/* <p className="description">님에게 답글달기</p> */}
                </HorizontalLayout.Group>
              </div>
            )}

            <input name="contents" placeholder="최고야~" required />
          </S.InputBoxWrapper>

          <button>작성</button>
        </S.WriteSection>
      </fieldset>
    </form>
  );
};

export const CommentDrawer = () => {
  const isCommentDrawerOpen = useAppStore<boolean>('isCommentDrawerOpen');
  const currentPostId = useAppStore<number>('currentPostId');

  const dragControls = useDragControls();

  const { data: comments, isPending } = useGetComments(currentPostId);

  if (isPending) {
    return;
  }

  const handleDragEnd = (event, panInfo) => {
    const { offset, velocity } = panInfo;

    const curDirection = offset.y < 0 ? -1 : 1;

    const offsetThreshold = document.body.clientHeight / 3;
    const veloctiyThreshold = 100;

    const overOffset = Math.abs(offset.y) > offsetThreshold;
    const overVelocity = Math.abs(velocity.y) > veloctiyThreshold;
    const couldTransition = overOffset || overVelocity;

    if (couldTransition && curDirection === 1) {
      AppStore.hideCommentDrawer();
    }
  };

  return (
    <ModalLayout shouldShow={isCommentDrawerOpen} onClose={() => AppStore.hideCommentDrawer()}>
      <S.Background
        onClick={(e) => e.stopPropagation()}
        dragId="commentDrawer"
        axis="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
      >
        <PageLayout
          head={<DrawerHead dragControls={dragControls} />}
          body={<DrawerBody comments={comments} />}
          foot={<DrawerFoot />}
        />
      </S.Background>
      {/* <S.Background
        onClick={(e) => e.stopPropagation()}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={1}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
      >
        <PageLayout
          head={<DrawerHead dragControls={dragControls} />}
          body={<DrawerBody comments={comments} />}
          foot={<DrawerFoot />}
        />
      </S.Background> */}
    </ModalLayout>
  );
};
