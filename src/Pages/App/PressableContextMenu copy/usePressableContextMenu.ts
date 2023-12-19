import { PointerEvent, useEffect, useRef, useState } from 'react';

export const usePressableContextMenu = () => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const buttonBounds = useRef<DOMRect>({ top: 0, height: 0 } as DOMRect);

  const oldY = useRef<number | null>(null);
  const lastOffset = useRef<number | null>(null);
  const interpolationY = useRef<number | null>(null);

  const [isPointerDown, setIsPointerDown] = useState(false);

  useEffect(() => {
    const getButtonBounds = () => {
      buttonBounds.current =
        buttonRef.current?.getBoundingClientRect() ||
        ({
          top: 0,
          height: 0,
        } as DOMRect);
    };

    const handleResize = () => getButtonBounds();

    getButtonBounds();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('reisze', handleResize);
  }, []);

  const startLongMenu = (event: PointerEvent<HTMLDivElement>) => {
    buttonRef.current?.setPointerCapture(event.pointerId);

    const { top: buttonTop } = buttonBounds.current;

    oldY.current = event.clientY;
    interpolationY.current = event.clientY - buttonTop;

    setIsPointerDown(true);
  };

  const moveLongMenu = (
    event: PointerEvent<HTMLDivElement>,
    callbacks?: {
      onFail?: () => void;
      onHover?: (hoverId: number) => void;
    }
  ) => {
    if (oldY.current === null || interpolationY.current === null) {
      return callbacks?.onFail && callbacks.onFail();
    }

    const offset = event.clientY - oldY.current;

    if (lastOffset.current === offset) {
      return callbacks?.onFail && callbacks.onFail();
    }

    const { height: buttonHeight } = buttonBounds.current;
    const currentY = offset + interpolationY.current;
    const hoverId = Math.floor(currentY / buttonHeight);

    callbacks?.onHover && callbacks.onHover(hoverId);

    lastOffset.current = offset;
  };

  const cleanUpLongMenu = () => {
    setIsPointerDown(false);

    oldY.current = null;
    lastOffset.current = null;
    interpolationY.current = null;
  };

  return {
    buttonRef,
    isStartLongMenuAction: isPointerDown,
    startLongMenu,
    moveLongMenu,
    cleanUpLongMenu,
  };
};
