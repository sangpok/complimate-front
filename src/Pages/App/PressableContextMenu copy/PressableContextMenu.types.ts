import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type ContextMenu = {
  id: number;
  icon: string;
  text: string;
};

export type MenuProp = {
  contextMenus: ContextMenu[];
  selectedMenuId: number;
  onSelect?: (selectedId: number) => void;
};

export type PressableContextMenuProp = MenuProp;

export type TriggerButtonProp = {
  contextMenu: ContextMenu;
  onPointerDown: () => void;
  onPointerUp: () => void;
  onHoverSelect: (hoverId: number) => void;
};

export type ButtonPresenterProp = {
  isSelected?: boolean;
} & ContextMenu &
  Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'id'>;

export type ContextMenuItemProp = {
  contextMenu: ContextMenu;
  isSelectedItem: boolean;
  isHoverSelected: boolean;
};

export type ContextMenuBoxProp = {
  contextMenus: ContextMenu[];
  isPointerDown: boolean;
  selectedMenuId: number;
  hoverIndex: number;
};
