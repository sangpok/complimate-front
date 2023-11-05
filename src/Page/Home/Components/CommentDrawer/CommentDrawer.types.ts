import { RefObject } from 'react';
import { AnimationScope } from 'framer-motion';

export type CommentDrawerProp = {
  comments: unknown | any;
  container: RefObject<HTMLDivElement>;
  drawerScope: AnimationScope;
};

export type OriginComment = {
  name: string;
  profile: string;
  date: string;
  body: string;
  heartCount: number;
};

export type Comment = {
  replys?: OriginComment[];
} & OriginComment;

export type CommentItemInner = Comment;

export type CommentItemProp = {
  comment: Comment;
};

export type CommentListProp = {
  comments: Comment[];
};
