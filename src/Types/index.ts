import { ComponentType } from 'react';

export type CheckFieldResult = {
  [k: string]: boolean;
};

export type SubmitCallbacks = {
  onSuccess?: () => void;
  onFail?: (error: Error) => void;
  onSettled?: () => void;
};

export type FormConfig = {
  formId: string;
  formName: string;
  Component: ComponentType;
  submitFn: unknown;
  nextButtonText: string;
};

export type UserAuth = {
  email: string;
  password: string;
  nickname: string;
  profileUrl: string;
};

export type LikeType = 'LIKE' | 'PRAY' | 'LAUGH_WITH_SAD' | 'HEART_EYES' | 'ANGEL_SMILE';

export type PostLike = {
  id: number;
  likeType: LikeType;
  likeCount: number;
  isLiked: boolean;
};

export type Writer = Omit<UserAuth, 'email' | 'password'>;

export type Comment = {
  id: number;
  createdAt: number;
  contents: string;
  replyCount: number;
  isLiked: boolean;
  likeCount: number;
  writer: Writer;
};

export type MediaUrl = {
  mediaUrl: string;
  mediaType: string;
};

export type ComplementPost = {
  id: number;
  createdAt: number;
  contents: string;
  totalLikeCount: number;
  likeList: PostLike[];
  writer: Writer;
  bestCommentList: Comment[];
  mediaUrlList: MediaUrl[];
  totalCommentCount: number;
};

export type CreatePostRequest = {
  contents: string;
  mediaUrlList: MediaUrl[];
};

export type CreatePostResponse = {
  complementId: number;
};

export type CreateCommentRequest = {
  postId: number;
  contents: string;
  parentId?: number;
};

export type CreateCommentResponse = {
  commentId: number;
};

export type LikePostRequest = {
  postId: number;
  likeType: LikeType;
};

export type MyCompliment = {
  id: number;
  contents: string;
  likeCount: number;
  commentCount: number;
};

export type MyComment = {
  id: number;
  contents: string;
  likeCount: number;
};

export type CompCount = {
  writeCompCount: number;
  receiveCompCount: number;
};
