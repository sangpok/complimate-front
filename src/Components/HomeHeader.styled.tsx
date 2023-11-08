import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
const { space } = Tokens;

export const Header = styled('header')(
  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: space.double,

    zIndex: 9,

    position: 'sticky',
    top: 0,

    button: {
      all: 'unset',
      display: 'flex',
    },

    '& div.group': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.double,
    },
  },
  ({ theme }) => ({
    background: theme.colors.background.default,
  })
);
