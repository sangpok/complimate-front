import type { DraggableProps, HTMLMotionProps } from 'framer-motion';
import type { PointerEvent } from 'react';

export type DraggableComponentProp = {
  dragId: string;
  axis: DragAxis;
  // dragConstraints?: DraggableProps['dragConstraints'];
  children?: React.ReactNode;
} & HTMLMotionProps<'div'>;

export type ThingCouldBeTarget = {
  id: string;
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any
    --
    Framer Motion의 DragControl 안쪽 Private Variable을 가리킴 */
  target: any;
};

export type DragVariable = {
  isDragging: boolean;
  isPointerDown: boolean;
  havntAxisTarget: boolean;
  scopeOut: boolean;
  clickedEvent: PointerEvent<HTMLDivElement>;
};

export const DragAxis = {
  X: 'x',
  Y: 'y',
} as const;

export const DragDirection = {
  Up: 'up',
  Down: 'down',
  Left: 'left',
  Right: 'right',
} as const;

type ValueOf<T> = T[keyof T];

export type DragAxis = ValueOf<typeof DragAxis>;

export type DragDirection = ValueOf<typeof DragDirection>;
