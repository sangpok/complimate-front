import React, { useCallback } from 'react';
import { motion, useDragControls } from 'framer-motion';

import type { DragControls, PanInfo } from 'framer-motion';
import type { PointerEvent } from 'react';

import {
  DragAxis,
  DragDirection,
  DragVariable,
  DraggableComponentProp,
  ThingCouldBeTarget,
} from './DraggableComponent.types';

/**
 * Ref를 안 쓰고 Outer Scope를 쓰는 이유는,,
 * Ref는 해당 컴포넌트가 쓰인 모듈 내에서 값이 유지가 되는 존재이다.
 * 즉,, DraggableComponent가 쓰일 때마다 새롭게 생성이 되는 것.
 *
 * 그렇게 되면 각각 마다 새로운 dragControls이 생성이 돼서 관리가 안 되고,
 * 각 포인터 이벤트들의 호출이 매번 일어나서 각 DraggableComponent Instance들이 따로 설정해줘야 한다
 * 와중에 framer motion은 따로 DOM을 관리해서 이벤트가 이미 일어나고 있는 상황이므로,
 * 같은 작업이 여러번 반복되는 셈이다.
 * (물론 중첩된 상태의 컴포넌트를 알아내기 위해선 어쨌든 각 컴포넌트들의 pointer down event가 일어나긴 해야하지만
 * 이후 Pointer Move, Up에선 모든 DraggableComponent들이 처리해줄 필욘 없다. Target만 처리하면 되므로.)
 *
 * 그러므로~ 공통으로 빼두어 모듈 단위로 관리해주는 것이 반복된 행동이 일어나지 않게 해준다고 판단하였다.
 */

let dragControls: DragControls | null = null;
let thingsCouldBeTarget: ThingCouldBeTarget[] = [];

let dragVariable: DragVariable = {
  isDragging: false,
  isPointerDown: false,
  havntAxisTarget: false,
  scopeOut: false,
  clickedEvent: {} as PointerEvent<HTMLDivElement>,
};

const mutateDragVariable = (newValue: Partial<DragVariable>) => {
  dragVariable = { ...dragVariable, ...newValue };
};

const cleanUpDragVariable = () => {
  thingsCouldBeTarget = [];

  mutateDragVariable({
    isDragging: false,
    isPointerDown: false,
    havntAxisTarget: false,
    scopeOut: false,
    clickedEvent: {} as PointerEvent<HTMLDivElement>,
  });
};

const DraggableComponent = React.memo(
  ({ dragId, axis, dragConstraints, onDragEnd, children, ...rest }: DraggableComponentProp) => {
    const _dragControls = useDragControls();

    if (!dragControls) {
      dragControls = _dragControls;
    }

    const makeTargetList = useCallback((currentTargetId: string) => {
      // @ts-expect-error: Framer Motion의 DragControl 안쪽 Private Variable을 직접 꺼냄
      const { componentControls } = dragControls!;

      // @ts-expect-error: Framer Motion의 DragControl 안쪽 Private Variable을 직접 꺼냄
      componentControls.forEach((entry) => {
        const isTargetElement = entry.visualElement.props.id === currentTargetId;
        const havingTarget = thingsCouldBeTarget.find(({ id }) => id === currentTargetId);

        if (isTargetElement && !havingTarget) {
          thingsCouldBeTarget.push({ id: currentTargetId, target: entry });
        }
      });
    }, []);

    const getAxisTargets = useCallback((axis: DragAxis) => {
      const axisTargets = [];

      for (let i = 0; i < thingsCouldBeTarget.length; i++) {
        const { target: currentTarget } = thingsCouldBeTarget[i];

        if (currentTarget.visualElement.props.drag === axis) {
          axisTargets.push(currentTarget);
        }
      }

      return axisTargets;
    }, []);

    const getAxisAndDirection = useCallback(
      (currentX: number, currentY: number, oldX: number, oldY: number) => {
        const [diffX, diffY] = [currentX - oldX, currentY - oldY];
        const [amountX, amountY] = [Math.abs(diffX), Math.abs(diffY)];
        const axis = amountX >= amountY ? DragAxis.X : DragAxis.Y;

        let direction: DragDirection | null = null;

        if (axis === DragAxis.X) {
          direction = diffX < 0 ? DragDirection.Left : DragDirection.Right;
        } else {
          direction = diffY < 0 ? DragDirection.Up : DragDirection.Down;
        }

        return { axis, direction };
      },
      []
    );

    const startDragTarget = useCallback(
      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any
      --
      Framer Motion의 DragControl 안쪽 Private Variable을 직접 꺼낸 객체를 저장함 */
      (axisTargets: any[], axis: DragAxis, direction: DragDirection, afterStart: () => void) => {
        for (let i = 0; i < axisTargets.length; i++) {
          const currentTarget = axisTargets[i];

          const minValue = currentTarget.constraints[axis]?.min || 0;
          const curValue = currentTarget.visualElement.values.get(axis)?.current || 0;

          const dragConditionStart = curValue !== 0 && curValue < 0;
          const dragConditionEnd = curValue !== minValue && curValue > minValue;

          const axisStartDirection = axis === DragAxis.Y ? DragDirection.Down : DragDirection.Right;
          const axisEndDirection = axis === DragAxis.Y ? DragDirection.Up : DragDirection.Left;

          const couldDragToAxisStart = direction === axisStartDirection && dragConditionStart;
          const couldDragToAxisEnd = direction === axisEndDirection && dragConditionEnd;

          const isLastTarget = i === axisTargets.length - 1;

          const couldDrag = couldDragToAxisStart || couldDragToAxisEnd || isLastTarget;

          if (couldDrag) {
            console.log(currentTarget.visualElement.props.id, 'Drag 시작');
            console.log(currentTarget);
            currentTarget.start(dragVariable.clickedEvent);
            return afterStart();
          }
        }
      },
      []
    );

    const handlePointerDown = useCallback(
      (event: PointerEvent<HTMLDivElement>) => {
        makeTargetList(event.currentTarget.id);

        mutateDragVariable({
          isPointerDown: true,
          clickedEvent: event,
        });
      },
      [makeTargetList]
    );

    const handlePointerMove = useCallback(
      (event: PointerEvent<HTMLDivElement>) => {
        const { isPointerDown, isDragging, havntAxisTarget } = dragVariable;
        const couldDoDragEvent = isPointerDown && !isDragging && !havntAxisTarget;

        if (!couldDoDragEvent) return;

        const { clickedEvent } = dragVariable;
        const { clientX: currentX, clientY: currentY } = event;
        const { clientX: oldX, clientY: oldY } = clickedEvent;
        const isNoMove = currentX == Math.trunc(oldX) && currentY === Math.trunc(oldY);

        if (isNoMove) return;

        const { axis, direction } = getAxisAndDirection(currentX, currentY, oldX, oldY);
        const axisTargets = getAxisTargets(axis);

        if (axisTargets.length === 0) {
          mutateDragVariable({ havntAxisTarget: true });
          console.log('해당 방향으로 움직일 수 있는 Target 없음!');
          return;
        }

        console.log({ axis, direction });

        startDragTarget(axisTargets, axis, direction, () => {
          mutateDragVariable({ isDragging: true });
        });
      },
      [getAxisAndDirection, getAxisTargets, startDragTarget]
    );

    const handlePointerUp = useCallback(() => {
      // console.log(dragVariable);
      cleanUpDragVariable();
    }, []);

    const handlePointerEnter = useCallback(() => {
      const { scopeOut, havntAxisTarget } = dragVariable;

      // console.log(dragVariable);

      if (scopeOut && havntAxisTarget) {
        cleanUpDragVariable();
      }

      mutateDragVariable({ scopeOut: false });
    }, []);

    const handlePointerLeave = useCallback(() => mutateDragVariable({ scopeOut: true }), []);

    const handleDragEnd = useCallback(
      (event: globalThis.PointerEvent, panInfo: PanInfo) => {
        const { scopeOut } = dragVariable;

        if (scopeOut) {
          cleanUpDragVariable();
        }

        if (onDragEnd) {
          onDragEnd(event, panInfo);
        }
      },
      [onDragEnd]
    );

    const dragEventBind = {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
      onDragEnd: handleDragEnd,
    };

    return (
      <motion.div
        id={dragId}
        drag={axis}
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={dragConstraints}
        {...dragEventBind}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

export default DraggableComponent;
