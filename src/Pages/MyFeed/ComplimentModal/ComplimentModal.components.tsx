/** React */
import { useState } from 'react';

/** Style + Layout */
import { HorizontalLayout } from '@Layouts/HorizontalLayout';
import { Tokens } from '@Styles/tokens';
import * as S from './ComplimentModal.styled';

/** Component */
import { IconButton } from '@Components/IconButton';

/** Hook */
import { useGetReplys } from '@Hooks/index';

/** Icon */
import {
  Comment as CommentIcon,
  HeartFill as HeartFillIcon,
  Heart as HeartIcon,
} from '@Icons/index';

/** Type */
import type { Variants } from 'framer-motion';
import type {
  AnimatedBackgroundProp,
  AnimatedBoxProp,
  CommentBoxProp,
  CommentItemProp,
  CommentPresenterProp,
  LikeBoxProp,
  OriginCommentProp,
  ReplyCommentProp,
  WrtierPresenterProp,
} from './ComplimentModal.types';

const { sizes, space } = Tokens;

export const CommentPresenter = ({
  contents,
  createdAt,
  replyCount,
  likeCount,
  writer,
  isLiked,
  isReply,
  onReplyShowClick,
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

export const OriginComment = ({ onReplyShowClick, comment }: OriginCommentProp) => {
  return <CommentPresenter {...comment} onReplyShowClick={onReplyShowClick} />;
};

export const ReplyComment = ({ comment }: ReplyCommentProp) => {
  return <CommentPresenter isReply {...comment} onHeartClick={() => {}} />;
};

export const CommentItem = ({ postId, comment }: CommentItemProp) => {
  const [commentId, setCommentId] = useState<number | undefined>(undefined);

  const { data, isPending, isSuccess } = useGetReplys(postId, commentId);
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
            data.map((reply) => <ReplyComment key={`reply-${reply.id}`} comment={reply} />)}
        </S.ReplyBox>
      )}
    </S.CommentLayout>
  );
};

export const NoCommentsView = () => {
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
    </div>
  );
};

export const CommentBox = ({ postId, comments }: CommentBoxProp) => {
  const hasComments = comments.length !== 0;
  const hasNoComments = comments.length === 0;

  return (
    <div>
      <h3 style={{ marginBottom: space.default }}>댓글 목록</h3>
      {hasNoComments && <NoCommentsView />}
      {hasComments && (
        <ul>
          {comments.map((comment) => (
            <CommentItem postId={postId} key={`comment-${comment.id}`} comment={comment} />
          ))}
        </ul>
      )}
    </div>
  );
};

const iconMap = {
  LIKE: '👍',
  PRAY: '🙏',
  LAUGH_WITH_SAD: '🤣',
  HEART_EYES: '😍',
  ANGEL_SMILE: '😇',
};

export const LikeBox = ({ likeList }: LikeBoxProp) => {
  return (
    <div>
      <h3 style={{ marginBottom: space.default }}>받은 좋아요</h3>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {likeList.map(({ likeType, likeCount }) => (
          <div style={{ flex: 1 }}>
            <p style={{ textAlign: 'center' }}>{iconMap[likeType]}</p>
            <p style={{ textAlign: 'center' }}>{likeCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PostMetaInfo = ({ writer, createdAt }: WrtierPresenterProp) => {
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

const backgroundVariants: Variants = {
  show: { opacity: 1 },
  hide: { opacity: 0 },
};

export const AnimatedBackground = ({ children, onClick }: AnimatedBackgroundProp) => {
  return (
    <S.StyledBackground
      onClick={onClick}
      variants={backgroundVariants}
      initial="hide"
      animate="show"
      exit="hide"
    >
      {children}
    </S.StyledBackground>
  );
};

const boxVariants: Variants = {
  hide: { y: '100%' },
  show: { y: 0 },
  exit: { y: '100%' },
};

export const AnimatedBox = ({ onClick, children }: AnimatedBoxProp) => {
  return (
    <S.StyledBox onClick={onClick} variants={boxVariants} initial="hide" animate="show" exit="exit">
      {children}
    </S.StyledBox>
  );
};
