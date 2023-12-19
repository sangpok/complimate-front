import styled from '@emotion/styled';

import { Tokens } from '@Styles/tokens';
import { motion } from 'framer-motion';
const { sizes, space, fontSizes, radii } = Tokens;

export const MenuContainer = styled.div({
  maxWidth: sizes.menu.maxWidth,
  width: '70%',
  height: '100%',
  background: 'white',
  padding: space.double,
  willChange: 'transform',
  boxShadow: '0 0 25px rgba(0, 0, 0, .1)',
});

export const MenuTitle = styled.p({
  ...fontSizes.menu,
  fontWeight: '600',
});

export const ItemContainer = styled.li(
  {
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

    '& + &': {
      marginTop: space.default,
    },
  },
  ({ theme }) => ({
    '&.disabled': {
      color: theme.colors.text.greyed,
    },

    '&.selected': {
      color: theme.colors.text.point,
    },

    '&:not(&.disabled):active': {
      background: theme.colors.background.active,
    },
  })
);

export const FootContainer = styled.div(
  {
    display: 'flex',
    flexDireciton: 'row',
    alignItems: 'center',
    gap: space.smaller,
    ...fontSizes.menu,
    width: '100%',
    fontWeight: '800',
    marginBottom: space.default,
  },
  ({ theme }) => ({
    color: theme.colors.text.point,
  })
);
