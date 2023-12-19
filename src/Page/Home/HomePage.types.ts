import { TransitionDirection } from '@Page/Home/Components/ContentCard/ContentCard.types';
import { RefObject } from 'react';

export type DraggablePostProp = {
  post: object;
  onTransitionRaise: (newDirection: TransitionDirection) => void;
  drawerRef: RefObject<HTMLElement>;
};
