import { Comment, ComplementPost, PostLike, Writer } from '@Types/index';
import { MouseEvent, PropsWithChildren, ReactNode } from 'react';

export type FeedPostPresneterProp = {
  post: ComplementPost;
  comments: Comment[];
};

export type CommentPresenterProp = {
  isReply?: boolean;
  onReplyShowClick?: () => void;
  onReplyModeClick?: () => void;
  onHeartClick?: () => void;
} & Comment;

export type OriginCommentProp = {
  onReplyShowClick: () => void;
  comment: Comment;
};

export type ReplyCommentProp = {
  comment: Comment;
};

export type CommentItemProp = { postId: number; comment: Comment };

export type CommentBoxProp = { postId: number; comments: Comment[] };

export type LikeBoxProp = { likeList: PostLike[] };

export type WrtierPresenterProp = {
  writer: Writer;
  createdAt: number;
};

export type AnimatedBackgroundProp = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
};

export type AnimatedBoxProp = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
};

export type FeedPostProp = {
  feedId: number;
};

export type ComplimentModalProp = {
  isShow: boolean;
  feedId: number;
  onClose: () => void;
};
