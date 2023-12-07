import { MenuItem } from './SidebarMenu.types';
import * as Icon from '@Icons/index';

export const sidebarMenuList: MenuItem[] = [
  {
    name: '홈',
    icon: Icon.Home,
    path: '/',
    enabled: true,
  },
  {
    name: '내 피드',
    icon: Icon.Profile,
    path: 'myfeed',
    enabled: true,
  },
  {
    name: '명예의 전당',
    icon: Icon.Hamburger,
    path: 'cool',
    enabled: false,
  },
  {
    name: '추가 기능',
    icon: Icon.Hamburger,
    path: 'addon',
    enabled: false,
  },
];
