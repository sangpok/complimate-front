import { TransitionDirection } from '../ContentCard/ContentCard.types';
import type { RefObject } from 'react';

export type DraggablePostProp = {
  post: unknown | any;
  onTransitionRaise: (newDirection: TransitionDirection) => void;
  onCommentClick: () => void;
  onHeartClick: (id: string) => void;
};
