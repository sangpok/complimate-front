/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
import { motion } from 'framer-motion';
const { sizes, radii, space, fontSizes } = Tokens;

export const StyledButton = styled.button(
  {
    all: 'unset',

    boxSizing: 'border-box',
    height: '3rem',
    aspectRatio: '1 / 1',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',

    ...radii.small,
  },
  ({ theme }) => ({
    '&.selected': {
      background: theme.colors.background.active,
    },
  })
);

export const ButtonIcon = styled.p({
  ...fontSizes.button.lg,
  textAlign: 'center',
});

export const ButtonText = styled.p({
  ...fontSizes.button.sm,
  fontWeight: '600',
  textAlign: 'center',
});

export const ButtonContainer = styled(motion.div)({
  ...radii.small,
});

export const StyledLi = styled(motion.li)({
  listStyle: 'none',
  ...radii.small,
});

export const ContextMenuBoxContainer = styled(motion.div)({
  position: 'absolute',
  top: `-${space.small}`,
  left: `-${space.small}`,
  pointerEvents: 'none',
});

export const StyledUl = styled.ul(
  {
    boxShadow: '0 0 12px rgba(0, 0, 0, .1)',
    ...radii.small,
    overflow: 'hidden',
    padding: space.small,
  },
  ({ theme }) => ({
    background: theme.colors.background.default,
  })
);
