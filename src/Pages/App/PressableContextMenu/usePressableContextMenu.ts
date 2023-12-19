import { PointerEvent, useEffect, useRef } from 'react';

export const usePressableContextMenu = () => {
  const buttonRef = useRef<HTMLDivElement>(null);
  // const buttonBounds = useRef<DOMRect>({ top: 0, height: 0 } as DOMRect);

  const oldY = useRef<number | null>(null);
  const lastOffset = useRef<number | null>(null);
  const interpolationY = useRef<number | null>(null);

  // useEffect(() => {
  //   const getButtonBounds = () => {
  //     buttonBounds.current =
  //       buttonRef.current?.getBoundingClientRect() ||
  //       ({
  //         top: 0,
  //         height: 0,
  //       } as DOMRect);
  //   };

  //   const handleResize = () => getButtonBounds();

  //   getButtonBounds();

  //   window.addEventListener('resize', handleResize);

  //   return () => window.removeEventListener('reisze', handleResize);
  // }, []);

  const startLongMenu = (event: PointerEvent<HTMLDivElement>) => {
    buttonRef.current?.setPointerCapture(event.pointerId);

    const { top: buttonTop } = buttonRef.current?.getBoundingClientRect() || {
      top: 0,
      height: 0,
    };
    // const { top: buttonTop } = buttonBounds.current;
    console.log({ buttonTop });

    oldY.current = event.clientY;
    interpolationY.current = event.clientY - buttonTop;
  };

  const moveLongMenu = (
    event: PointerEvent<HTMLDivElement>,
    callbacks?: {
      onFail?: () => void;
      onHover?: (hoverIndex: number) => void;
    }
  ) => {
    if (oldY.current === null || interpolationY.current === null) {
      return callbacks?.onFail && callbacks.onFail();
    }

    const offset = event.clientY - oldY.current;

    if (lastOffset.current === offset) {
      return callbacks?.onFail && callbacks.onFail();
    }

    const { height: buttonHeight } = buttonRef.current?.getBoundingClientRect() || {
      top: 0,
      height: 0,
    };
    // const { height: buttonHeight } = buttonBounds.current;
    const currentY = offset + interpolationY.current;
    const hoverIndex = Math.floor(currentY / buttonHeight);

    callbacks?.onHover && callbacks.onHover(hoverIndex);

    lastOffset.current = offset;
  };

  const cleanUpLongMenu = () => {
    oldY.current = null;
    lastOffset.current = null;
    interpolationY.current = null;
  };

  return {
    buttonRef,
    startLongMenu,
    moveLongMenu,
    cleanUpLongMenu,
  };
};
