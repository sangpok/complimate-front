/** React */
import { PointerEvent, useState } from 'react';

/** Type */
import type { PressableContextMenuProp } from './PressableContextMenu.types';
import { usePressableContextMenu } from './usePressableContextMenu';

export const PressableContextMenu = ({
  onSelect,
  triggerButton,
  contextMenu,
}: PressableContextMenuProp) => {
  const { buttonRef, startLongMenu, moveLongMenu, cleanUpLongMenu } = usePressableContextMenu();

  const [isPointerDown, setIsPointerDown] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startLongMenu(event);
    setIsPointerDown(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    moveLongMenu(event, { onHover: setHoverIndex });
  };

  const handlePointerUp = () => {
    cleanUpLongMenu();
    setIsPointerDown(false);
    onSelect(hoverIndex);
  };

  return (
    <div style={{ position: 'relative', zIndex: 99 }}>
      <div
        ref={buttonRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {triggerButton(isPointerDown)}
      </div>

      {contextMenu(isPointerDown, hoverIndex)}
    </div>
  );
};
