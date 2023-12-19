import { ReactNode } from 'react';

export type PressableContextMenuProp = {
  onSelect: (selectedIndex: number) => void;
  triggerButton: (isPressed: boolean) => ReactNode;
  contextMenu: (isOpened: boolean, hoverIndex: number) => ReactNode;
};
