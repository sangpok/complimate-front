export enum TransitionDirection {
  Down = -1,
  Up = 1,
}

export type ContentCardProp = {
  post: unknown;
  onTransitionRaise: (direction: TransitionDirection) => void;
  onCommentClick: () => void;
  onHeartClick: (id: string) => void;
};
