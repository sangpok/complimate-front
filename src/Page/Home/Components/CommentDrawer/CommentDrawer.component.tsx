import InlineProfile from '@Components/InlineProfile';
import * as Icon from '@Icons/index';
import * as Layout from '@Layouts/DefaultLayout';
import * as S from './CommentDrawer.styled.tsx';
import type { CommentItemInner, CommentItemProp, CommentListProp } from './CommentDrawer.types';

const ItemInner = ({
  id,
  name,
  profile,
  date,
  body,
  replys,
  heartCount,
  onMoreMenuClick,
  onReplyButtonClick,
  onHeartClick,
}: CommentItemInner) => {
  return (
    <S.CommentItemInner className="댓글 Inner">
      <div className="group">
        <Layout.Head>
          <S.CommentItemHead className="댓글 Head">
            <div className="group">
              <InlineProfile type="normal" nickname={name} profile={profile} />
              <p className="time">{date}</p>
            </div>

            <button onClick={() => onMoreMenuClick(id)}>
              <S.MoreIcon />
            </button>
          </S.CommentItemHead>
        </Layout.Head>

        <Layout.Body className="댓글 본문">
          <S.CommentItemBody className="body">{body}</S.CommentItemBody>
        </Layout.Body>
      </div>

      <Layout.Foot>
        <S.CommentItemFoot className="댓글 Foot">
          {replys && (
            <button onClick={() => onReplyButtonClick(id)}>
              <S.CommentIcon />
              {replys.length}
            </button>
          )}
          <button onClick={() => onHeartClick(id)}>
            <S.HeartIcon />
            {heartCount}
          </button>
        </S.CommentItemFoot>
      </Layout.Foot>
    </S.CommentItemInner>
  );
};

const Item = ({ comment, onItemClick }: CommentItemProp) => {
  const handleHeartClick = (id: number) => {
    onItemClick(id, 'heart');
  };

  const handleMoreMenuClick = (id: number) => {
    onItemClick(id, 'more');
  };

  const handleReplyButtonClick = (id: number) => {
    onItemClick(id, 'reply');
  };

  return (
    <S.CommentItem className="댓글 하나">
      <ItemInner
        {...comment}
        onHeartClick={handleHeartClick}
        onMoreMenuClick={handleMoreMenuClick}
        onReplyButtonClick={handleReplyButtonClick}
      />
      {comment.replys && (
        <S.CommentReplyList className="대댓 목록">
          {comment.replys.map((reply) => (
            <ItemInner
              key={reply.id}
              {...reply}
              onHeartClick={handleHeartClick}
              onMoreMenuClick={handleMoreMenuClick}
              onReplyButtonClick={handleReplyButtonClick}
            />
          ))}
        </S.CommentReplyList>
      )}
    </S.CommentItem>
  );
};

const List = ({ comments, onItemClick }: CommentListProp) => {
  return (
    <S.CommentList className="댓글 목록">
      {comments.map((comment) => (
        <Item key={comment.id} comment={comment} onItemClick={onItemClick} />
      ))}
    </S.CommentList>
  );
};

const CommentIcon = ({ IconInner, ...rest }) => (
  <IconInner
    css={{
      width: '$icon-comment',
      height: '$icon-comment',
      ...rest,
    }}
  />
);

export { Item, ItemInner, List, CommentIcon };
