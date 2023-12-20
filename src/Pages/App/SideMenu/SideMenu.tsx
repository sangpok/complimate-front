import { ModalLayout } from '@Layouts/ModalLayout';
import React, {
  PropsWithChildren,
  ReactChild,
  ReactElement,
  ReactFragment,
  ReactNode,
  ReactPortal,
  cloneElement,
  useRef,
  useSyncExternalStore,
} from 'react';

import styled from '@emotion/styled';

import { Tokens } from '@Styles/tokens';
import { PageLayout } from '@Layouts/PageLayout';
import { HorizontalLayout } from '@Layouts/HorizontalLayout';
import { IconButton } from '@Components/IconButton';
const { sizes, space, fontSizes, radii } = Tokens;

import { Left as LeftIcon, Setting as SettingIcon, Logo as LogoIcon } from '@Icons/index';

import { MenuItem, sideMenuList } from './SideMenu.list';
import { useLocation, useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';

import * as S from './SideMenu.styled';
import { AppStore, useAppStore } from '@Store/AppStore';
import { SlideAnimate } from '@Animations/index';

const MenuHead = ({ onSettingClick }: { onSettingClick: () => void }) => {
  return (
    <HorizontalLayout.Root>
      <HorizontalLayout.Group gap={space.default}>
        <IconButton onClick={() => AppStore.hideSideMenu()}>
          <LeftIcon />
        </IconButton>

        <S.MenuTitle>메뉴</S.MenuTitle>
      </HorizontalLayout.Group>

      <IconButton onClick={onSettingClick}>
        <SettingIcon />
      </IconButton>
    </HorizontalLayout.Root>
  );
};

type MenuItemProp = {
  isCurrentPath: boolean;
  onClick: (path: string) => void;
} & MenuItem;

const MenuItem = ({ enabled, isCurrentPath, icon: Icon, path, name, onClick }: MenuItemProp) => {
  const selected = isCurrentPath ? 'selected' : '';
  const disabled = !enabled ? 'disabled' : '';

  return (
    <S.ItemContainer
      className={[selected, disabled].join(' ').trim()}
      onClick={() => onClick(path)}
    >
      <Icon />
      <span>{name}</span>
    </S.ItemContainer>
  );
};

const MenuBody = ({ onMenuClick }: { onMenuClick: (path: string) => void }) => {
  const location = useLocation();

  return (
    <ul style={{ marginTop: space.double }}>
      {sideMenuList.map((sideMenu) => (
        <MenuItem
          key={sideMenu.path}
          isCurrentPath={location.pathname === sideMenu.path}
          {...sideMenu}
          onClick={onMenuClick}
        />
      ))}
    </ul>
  );
};

const MenuFoot = () => {
  return (
    <S.FootContainer>
      <LogoIcon />
      <span>컴플리메이트</span>
    </S.FootContainer>
  );
};

export const SideMenu = () => {
  const navigate = useNavigate();
  const isSideMenuOpen = useAppStore<boolean>('isSideMenuOpen');

  const wouldRouting = useRef(false);
  const routingPath = useRef<string>('');

  // TODO: 메뉴 이동
  const handleAfterClose = () => {
    if (wouldRouting.current) {
      return navigate(routingPath.current);
    }
  };

  const handleSettingClick = () => {
    wouldRouting.current = true;
    routingPath.current = '/app/setting';

    AppStore.hideSideMenu();
  };

  const handleMenuClick = (path: string) => {
    wouldRouting.current = true;
    routingPath.current = path;

    AppStore.hideSideMenu();
  };

  return (
    <ModalLayout
      shouldShow={isSideMenuOpen}
      onClose={() => AppStore.hideSideMenu()}
      afterClose={handleAfterClose}
    >
      <SlideAnimate>
        <S.MenuContainer onClick={(e) => e.stopPropagation()}>
          <PageLayout
            head={<MenuHead onSettingClick={handleSettingClick} />}
            body={<MenuBody onMenuClick={handleMenuClick} />}
            foot={<MenuFoot />}
          />
        </S.MenuContainer>
      </SlideAnimate>
    </ModalLayout>
  );
};
