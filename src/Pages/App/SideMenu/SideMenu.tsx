import { ModalLayout } from '@Layouts/ModalLayout';
import React, {
  PropsWithChildren,
  ReactChild,
  ReactElement,
  ReactFragment,
  ReactNode,
  ReactPortal,
  cloneElement,
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
import { useLocation } from 'react-router-dom';

import { motion } from 'framer-motion';

import * as S from './SideMenu.styled';
import { AppStore, useAppStore } from '@Store/AppStore';
import { SlideAnimate } from '@Animations/index';

const MenuHead = () => {
  return (
    <HorizontalLayout.Root>
      <HorizontalLayout.Group gap={space.default}>
        <IconButton onClick={() => AppStore.hideSideMenu()}>
          <LeftIcon />
        </IconButton>

        <S.MenuTitle>메뉴</S.MenuTitle>
      </HorizontalLayout.Group>

      <IconButton>
        <SettingIcon />
      </IconButton>
    </HorizontalLayout.Root>
  );
};

type MenuItemProp = {
  isCurrentPath: boolean;
} & MenuItem;

const MenuItem = ({ enabled, isCurrentPath, icon: Icon, path, name, onClick }: MenuItemProp) => {
  const selected = isCurrentPath ? 'selected' : '';
  const disabled = !enabled ? 'disabled' : '';

  return (
    <S.ItemContainer className={[selected, disabled].join(' ').trim()}>
      <Icon />
      <span>{name}</span>
    </S.ItemContainer>
  );
};

const MenuBody = () => {
  const location = useLocation();

  return (
    <ul style={{ marginTop: space.double }}>
      {sideMenuList.map((sideMenu) => (
        <MenuItem
          key={sideMenu.path}
          isCurrentPath={location.pathname === sideMenu.path}
          {...sideMenu}
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
  const isSideMenuOpen = useAppStore<boolean>('isSideMenuOpen');

  // TODO: 메뉴 이동
  const handleAfterClose = () => {};

  return (
    <ModalLayout
      shouldShow={isSideMenuOpen}
      onClose={() => AppStore.hideSideMenu()}
      afterClose={handleAfterClose}
    >
      <SlideAnimate>
        <S.MenuContainer onClick={(e) => e.stopPropagation()}>
          <PageLayout head={<MenuHead />} body={<MenuBody />} foot={<MenuFoot />} />
        </S.MenuContainer>
      </SlideAnimate>
    </ModalLayout>
  );
};
