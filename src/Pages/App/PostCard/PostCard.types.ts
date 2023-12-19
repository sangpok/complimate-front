import { ComplementPost, PostLike, Writer } from '@Types/index';

export type WrtierPresenterProp = {
  writer: Writer;
  createdAt: number;
};

export type PostCardProp = {
  post: ComplementPost;
  onTransition: (transition: number) => void;
};

export type HeartButtonProp = {
  totalLikeCount: number;
  likeList: PostLike[];
} & ComplementPost;
