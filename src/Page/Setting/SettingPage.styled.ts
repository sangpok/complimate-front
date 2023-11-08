import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
import * as Icon from '@Icons/index';

const { space, fontSizes } = Tokens;

export const RightIcon = styled(Icon.Left)({
  rotate: '180deg',
});

export const ListGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: space.double,

  padding: space.double,
  paddingTop: 0,
});

export const Item = styled('li')(
  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: space.default,
    ...fontSizes.default,

    'span.name': {
      fontWeight: 600,
    },

    'div.group': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: space.small,

      'span.placeholder': {
        ...fontSizes.caption,
        fontWeight: 500,
      },

      button: {
        all: 'unset',
        display: 'flex',
      },
    },
  },
  ({ theme }) => ({
    background: theme.colors.background.depth,

    'div.right': {
      'span.placeholder': {
        color: theme.colors.text.greyed,
      },
    },

    '&:active': {
      background: theme.colors.background.depth,
    },
  })
);

export const Group = styled('ul')({
  borderRadius: '$small',
  overflow: 'hidden',

  // border: '1px solid red',
});
