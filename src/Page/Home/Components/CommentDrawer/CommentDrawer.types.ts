import { AnimationScope } from 'framer-motion';

/**
 * TODO: CommentItemClickType Enum 만들기
 * TODO: SortType Enum 만들기
 */
export type CommentDrawerProp = {
  comments: unknown | any;
  container: HTMLDivElement;
  drawerScope: AnimationScope;
  onCommentItemClick: (id: number, type: string) => void;
  onSortClick: (sortType: string) => void;
  onClose: () => void;
};

export type OriginComment = {
  id: string;
  name: string;
  profile: string;
  date: string;
  body: string;
  heartCount: number;
};

export type Comment = {
  replys?: OriginComment[];
} & OriginComment;

export type CommentItemInner = {
  onMoreMenuClick: (itemId: string) => void;
  onReplyButtonClick: (itemId: string) => void;
  onHeartClick: (itemId: string) => void;
} & Comment;

export type CommentItemProp = {
  comment: Comment;
  onItemClick: (id: string, type: string) => void;
};

export type CommentListProp = {
  comments: Comment[];
  onItemClick: (id: string, type: string) => void;
};
