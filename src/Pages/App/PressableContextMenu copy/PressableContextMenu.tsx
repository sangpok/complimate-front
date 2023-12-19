/** React */
import { useState } from 'react';

/** Style & Component */
import * as C from './PressableContextMenu.components';
import { relativeStyle } from './PressableContextMenu.styled';

/** Type */
import type { PressableContextMenuProp } from './PressableContextMenu.types';

export const PressableContextMenu = ({
  contextMenus,
  selectedMenuId,
  onSelect,
}: PressableContextMenuProp) => {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);

  const selectedMenu = contextMenus[selectedMenuId];

  const handlePointerUp = () => {
    setIsPointerDown(false);
    onSelect && onSelect(hoverIndex);
  };

  const handleHoverSelect = (hoverId: number) => {
    if (0 <= hoverId && hoverId < contextMenus.length) {
      setHoverIndex(hoverId);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <C.TriggerButton
        contextMenu={selectedMenu}
        onPointerDown={() => setIsPointerDown(true)}
        onPointerUp={handlePointerUp}
        onHoverSelect={handleHoverSelect}
      />

      <C.ContextMenuBox
        contextMenus={contextMenus}
        isPointerDown={isPointerDown}
        selectedMenuId={selectedMenuId}
        hoverIndex={hoverIndex}
      />
    </div>
  );
};
