import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
const { fontSizes } = Tokens;

import * as Icon from '@Icons/index';

export const HeartFilIcon = styled(Icon.HeartFill)({}, ({ theme }) => ({
  color: theme.colors.icon.point,
}));

export const HeartIcon = styled(Icon.Heart)({}, ({ theme }) => ({
  color: theme.colors.icon.point,
}));

export const Sticker = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    button: {
      all: 'unset',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    p: {
      ...fontSizes.button.sm,
      fontWeight: '700',
    },
  },
  ({ theme }) => ({
    p: {
      color: theme.colors.text.point,
    },
  })
);
