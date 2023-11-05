import { TransitionDirection } from '@Components/ContentCard.types';
import { Left as IconComponent } from '@Icons/index';
import Stitches from '@stitches/react';
import { AnimationScope } from 'framer-motion';
import { ComponentType, RefObject } from 'react';

export type SideBarMenuProp = {
  container: RefObject<HTMLElement>;
  onBackClick: () => void;
  onSettingClick: () => void;
  onMenuItemClick: (path: string) => void;
  overlayScope: AnimationScope<any>;
  contentScope: AnimationScope<any>;
};

export type MenuItem = {
  name: string;
  icon: ComponentType;
  path: string;
  enabled: boolean;
};

export type MenuIconProp = {
  IconInner: ComponentType<Stitches.ComponentProps<typeof IconComponent>>;
} & Stitches.CSS;

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

export type DraggablePostProp = {
  post: object;
  onTransitionRaise: (newDirection: TransitionDirection) => void;
  drawerRef: RefObject<HTMLElement>;
};
