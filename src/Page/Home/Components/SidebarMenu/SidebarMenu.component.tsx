import { MenuHeadProp, MenuIconProp, MenuItemProp, MenuListProp } from './SidebarMenu.types';
import React from 'react';
import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
const { sizes } = Tokens;

import * as Dialog from '@radix-ui/react-dialog';
import * as S from './SidebarMenu.styled';
import * as Icon from '@Icons/index';
import * as Layout from '@Layouts/DefaultLayout';

const MiniLogo = React.memo(() => (
  <S.MenuFooter>
    <S.LogoIcon />
    <span>컴플리메이트</span>
  </S.MenuFooter>
));

const MenuIcon = React.memo(({ IconInner, enabled, selected }: MenuIconProp) => {
  const StyledIcon = styled(IconInner)<{ enabled?: boolean; selected?: boolean }>(
    {
      width: sizes.icon.menu,
      height: sizes.icon.menu,
    },
    ({ theme, enabled, selected }) => ({
      color: !enabled
        ? theme.colors.icon.disabled
        : selected
        ? theme.colors.icon.point
        : theme.colors.icon.default,
    })
  );

  return <StyledIcon enabled={enabled} selected={selected} />;
});

const Head = React.memo(({ onBackClick, onSettingClick }: MenuHeadProp) => {
  return (
    <S.SideBarHeader>
      <div className="group">
        <button onClick={onBackClick}>
          {/* <MenuIcon IconInner={Icon.Left} /> */}
          <S.LeftIcon />
        </button>
        <p>메뉴</p>
      </div>

      <button onClick={onSettingClick}>
        <S.SettingIcon />
      </button>
    </S.SideBarHeader>
  );
});

const Item = React.memo(({ selected, item, onClick }: MenuItemProp) => {
  return (
    <li
      className={!item.enabled ? 'disabled' : selected ? 'selected' : ''}
      onClick={() => item.enabled && onClick(item.path)}
    >
      <MenuIcon IconInner={item.icon} enabled={item.enabled} selected={selected} />
      {item.name}
    </li>
  );
});

const List = React.memo(({ list, currentPath, onMenuItemClick }: MenuListProp) => {
  return (
    <S.MenuList>
      {list.map((item) => (
        <Item
          key={item.path}
          selected={currentPath === item.path}
          item={item}
          onClick={onMenuItemClick}
        />
      ))}
    </S.MenuList>
  );
});

export { MiniLogo, Head, Item, List };
