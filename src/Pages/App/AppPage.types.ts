import { TransitionDirection } from '@Pages/App/Components/ContentCard/ContentCard.types';
import { RefObject } from 'react';

export type DraggablePostProp = {
  post: object;
  onTransitionRaise: (newDirection: TransitionDirection) => void;
  drawerRef: RefObject<HTMLElement>;
};
