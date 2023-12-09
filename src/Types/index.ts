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
  likeType: LikeType;
  likeCount: number;
};

export type Comment = {
  id: number;
  createdAt: number;
  contents: string;
  likeCount: number;
  writer: Omit<UserAuth, 'email' | 'password'>;
};

export type ComplementPost = {
  id: number;
  createdAt: number;
  contents: string;
  totalLikeCount: number;
  likeList: PostLike[];
  writer: Omit<UserAuth, 'password' | 'email'>;
  bestCommentList: Comment[];
};
