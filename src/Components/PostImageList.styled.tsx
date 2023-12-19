import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Tokens } from '@Styles/tokens';
const { space, radii, sizes } = Tokens;

export const Container = styled.div({
  marginBottom: space.double,
  touchAction: 'none',
});

export const Image = styled.div({
  display: 'inline-block',
  width: `100%`,
  aspectRatio: '1 / 1',
  backgroundColor: '$depth2',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  ...radii.small,

  '& + &': {
    marginLeft: space.default,
  },
});

export const ImageList = styled(motion.div)({
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'visible',
  width: '100%',
  marginBottom: space.default,
});

export const ImageWrapper = styled(motion.div)({
  touchAction: 'pan-x',
});

export const ImageNavContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  gap: space.smaller,
});

export const Circle = styled.div(
  {
    width: sizes.nav,
    height: sizes.nav,
    ...radii.full,
  },
  ({ theme }) => ({
    background: theme.colors.nav.default,

    '&.selected': {
      background: theme.colors.nav.selected,
    },
  })
);
