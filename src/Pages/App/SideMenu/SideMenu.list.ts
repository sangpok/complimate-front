import * as Icon from '@Icons/index';
import { ComponentType } from 'react';

export type MenuItem = {
  name: string;
  icon: ComponentType;
  path: string;
  enabled: boolean;
};

export const sideMenuList: MenuItem[] = [
  {
    name: '홈',
    icon: Icon.Home,
    path: '/app',
    enabled: true,
  },
  {
    name: '내 피드',
    icon: Icon.Profile,
    path: '/app/myfeed',
    enabled: true,
  },
  {
    name: '명예의 전당',
    icon: Icon.Hamburger,
    path: '/app/cool',
    enabled: false,
  },
  {
    name: '추가 기능',
    icon: Icon.Hamburger,
    path: '/app/addon',
    enabled: false,
  },
];
