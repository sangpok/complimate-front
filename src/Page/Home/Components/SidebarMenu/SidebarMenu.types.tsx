import type { AnimationScope } from 'framer-motion';
import type { ComponentType, RefObject } from 'react';

export type MenuItem = {
  name: string;
  icon: ComponentType;
  path: string;
  enabled: boolean;
};

export type MenuIconProp = {
  IconInner: ComponentType;
  enabled?: boolean;
  selected?: boolean;
};

export type MenuHeadProp = {
  onBackClick: () => void;
  onSettingClick: () => void;
};

export type MenuItemProp = {
  selected: boolean;
  item: MenuItem;
  onClick: (path: string) => void;
};

export type MenuListProp = {
  list: MenuItem[];
  currentPath: string;
  onMenuItemClick: (path: string) => void;
};

export type SideBarMenuProp = {
  container: RefObject<HTMLElement>;
  onBackClick: () => void;
  onSettingClick: () => void;
  onMenuItemClick: (path: string) => void;
  overlayScope: AnimationScope<any>;
  contentScope: AnimationScope<any>;
};
