import styled from '@emotion/styled';
import * as Dialog from '@radix-ui/react-dialog';
import * as Icon from '@Icons/index';
import { motion } from 'framer-motion';

import { Tokens } from '@Styles/tokens';
const { space, sizes, fontSizes, radii } = Tokens;

export const LogoIcon = styled(Icon.Logo)({
  width: sizes.icon.small,
  height: sizes.icon.small,
});

export const LeftIcon = styled(Icon.Left)<{ color?: string }>(
  {
    width: sizes.icon.menu,
    height: sizes.icon.menu,
  },
  ({ theme, color }) => ({
    color: color || theme.colors.icon.default,
  })
);

export const SettingIcon = styled(Icon.Setting)({
  width: sizes.icon.menu,
  height: sizes.icon.menu,
});

export const DialogOverlay = styled(motion(Dialog.Overlay))({
  background: 'rgba(0 0 0 / 0.5)',
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  zIndex: 99,
  willChange: 'opacity',
});

export const DialogContent = styled(motion(Dialog.Content))({
  maxWidth: sizes.menu.maxWidth,
  width: '70%',
  height: '100%',
  background: 'white',
  padding: space.double,
  willChange: 'transform',
});

export const SideBarInner = styled('aside')(
  {
    width: '100%',
    height: '100%',
    padding: space.small,
    position: 'relative',

    footer: {
      display: 'flex',
      flexDireciton: 'row',
      alignItems: 'center',
      gap: space.smaller,
      ...fontSizes.menu,
      fontWeight: '800',

      position: 'absolute',
      bottom: space.default,
    },
  },
  ({ theme }) => ({
    footer: {
      color: theme.colors.text.point,
    },
  })
);

export const SideBarHeader = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: space.quard,

  '& div.group': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: space.default,

    button: {
      all: 'unset',
      lineHeight: '0',
    },

    p: {
      ...fontSizes.menu,
      fontWeight: '600',
    },
  },

  '& button': {
    all: 'unset',
    lineHeight: '0',
  },
});

export const MenuList = styled('ul')(
  {
    display: 'flex',
    flexDirection: 'column',
    gap: space.default,

    li: {
      all: 'unset',

      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.default,

      padding: `${space.default} 0`,

      ...fontSizes.menu,
      fontWeight: '500',

      '&.selected': {
        fontWeight: '700',
      },

      '&:not(&.disabled):active': {
        ...radii.small,
      },
    },
  },
  ({ theme }) => ({
    li: {
      '&.disabled': {
        color: theme.colors.text.greyed,
      },

      '&.selected': {
        color: theme.colors.text.point,
      },

      '&:not(&.disabled):active': {
        background: theme.colors.background.depth,
      },
    },
  })
);

export const MenuHead = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const MenuInner = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const MenuFooter = styled.div(
  {
    display: 'flex',
    flexDireciton: 'row',
    alignItems: 'center',
    gap: space.smaller,
    ...fontSizes.menu,
    fontWeight: '800',
  },
  ({ theme }) => ({
    color: theme.colors.text.point,
  })
);
