import InlineProfile from '@Components/InlineProfile';
import * as Icon from '@Icons/index';
import * as Layout from '@Layouts/DefaultLayout';
import { CommentItemInner, CommentItemProp, CommentListProp } from './CommentDrawer.types';

const ItemInner = ({ name, profile, date, body, replys, heartCount }: CommentItemInner) => {
  return (
    <div>
      <Layout.Head>
        <div className="left">
          <InlineProfile type="normal" nickname={name} profile={profile} />
          <p className="time">{date}</p>
        </div>

        <button>
          <Icon.More
            css={{
              width: '$icon-comment',
              height: '$icon-comment',
            }}
          />
        </button>
      </Layout.Head>

      <Layout.Body>
        <p className="body">{body}</p>
      </Layout.Body>

      <Layout.Foot>
        {replys && (
          <button>
            <Icon.Comment
              css={{
                width: '$icon-comment',
                height: '$icon-comment',
                lineHeight: 0,
                color: '$point',
              }}
            />
            {replys.length}
          </button>
        )}
        <button>
          <Icon.Heart
            css={{
              width: '$icon-comment',
              height: '$icon-comment',
              lineHeight: 0,
              color: '$point',
            }}
          />
          {heartCount}
        </button>
      </Layout.Foot>
    </div>
  );
};

const Item = ({ comment }: CommentItemProp) => {
  return (
    <div>
      <ItemInner {...comment} />
      {comment.replys && (
        <div className="padding">
          {comment.replys.map((reply) => (
            <ItemInner {...reply} />
          ))}
        </div>
      )}
    </div>
  );
};

const List = ({ comments }: CommentListProp) => {
  return (
    <>
      {comments.map((comment) => (
        <Item key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export { Item, ItemInner, List };
