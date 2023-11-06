import { MenuHeadProp, MenuIconProp, MenuItemProp, MenuListProp } from './SidebarMenu.types';

import * as Dialog from '@radix-ui/react-dialog';
import * as S from './SidebarMenu.styled';
import * as Icon from '@Icons/index';
import * as Layout from '@Layouts/DefaultLayout';

const MiniLogo = () => (
  <S.MenuFooter>
    <Icon.Logo
      css={{
        width: '$icon-sm',
        height: '$icon-sm',
      }}
    />
    <span>컴플리메이트</span>
  </S.MenuFooter>
);

const MenuIcon = ({ IconInner, ...rest }: MenuIconProp) => {
  return (
    <IconInner
      css={{
        width: '$icon-menu',
        height: '$icon-menu',
        color: '$body',
        ...rest,
      }}
    />
  );
};

const Head = ({ onBackClick, onSettingClick }: MenuHeadProp) => {
  return (
    <S.SideBarHeader>
      <div className="group">
        <button onClick={onBackClick}>
          <MenuIcon IconInner={Icon.Left} />
        </button>
        <p>메뉴</p>
      </div>

      <button onClick={onSettingClick}>
        <Icon.Setting />
      </button>
    </S.SideBarHeader>
  );
};

const Item = ({ selected, item, onClick }: MenuItemProp) => {
  return (
    <li
      className={!item.enabled ? 'disabled' : selected ? 'selected' : ''}
      onClick={() => item.enabled && onClick(item.path)}
    >
      <MenuIcon
        IconInner={item.icon}
        color={!item.enabled ? '$depth3' : selected ? '$point' : ''}
      />
      {item.name}
    </li>
  );
};

const List = ({ list, currentPath, onMenuItemClick }: MenuListProp) => {
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
};

export { MiniLogo, Head, Item, List };
