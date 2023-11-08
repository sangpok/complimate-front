import styled from '@emotion/styled';
import * as Icon from '@Icons/index';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tokens } from '@Styles/tokens';

const { space, fontSizes, radii, lineHeights, sizes } = Tokens;

export const FullPage = styled.div({});

export const LogoIcon = styled(Icon.Logo)({
  width: sizes.logo.default,
  height: sizes.logo.default,
});

export const LogoWrapper = styled(motion.div)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: space.double,
  marginTop: space.quard,

  width: '100%',
  position: 'absolute',
  top: 0,
});

export const Content = styled(motion.div)(
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100dvh',
    width: '100dvw',

    marginTop: '4rem',
    padding: '0 2rem',

    position: 'absolute',

    '& h1': {
      ...fontSizes.tutorial.title,
      // fontSize: '$tutorial-title',
      marginBottom: space.double,
    },

    '& p': {
      ...fontSizes.tutorial.content,
      // fontSize: '$tutorial-content',
      fontWeight: 600,
      ...lineHeights.tutorialContent,
      // lineHeight: '$tutorial-content',

      // '& strong': {
      //   color: '$point',
      // },
    },
  },
  ({ theme }) => ({
    '& p': {
      '& strong': {
        color: theme.colors.text.point,
      },
    },
  })
);

export const Nav = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: space.smaller,
  width: '100%',
  marginBottom: space.quard,

  position: 'absolute',
  bottom: 0,
});

export const Circle = styled.div(
  {
    width: sizes.nav,
    height: sizes.nav,
    borderRadius: '999px',
  },
  ({ theme }) => ({
    background: theme.colors.nav.default,

    '&.selected': {
      background: theme.colors.nav.selected,
    },
  })
);

export const ButtonSection = styled(motion.div)({
  position: 'absolute',
  bottom: '0',
  width: '100%',
  padding: `0 ${space.double}`,
  display: 'flex',
  marginBottom: `calc(${space.quard} * 2)`,
});

export const StyledLink = styled(Link)(
  {
    all: 'unset',

    width: '100%',
    // fontSize: '$button-text',
    ...fontSizes.button.text,
    fontWeight: 700,
    padding: `${space.default} ${space.double}`,
    textAlign: 'center',
    // borderRadius: '$small',
    ...radii.small,
    boxShadow: '0 0 10px 1px rgba(0, 0, 0, .2)',
  },
  ({ theme }) => ({
    color: theme.colors.button.inversion,
    background: theme.colors.button.point,
  })
);
