import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
const { fontSizes } = Tokens;

export const CCUserInfoContainer = styled.div(
  {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    '& p.time': {
      ...fontSizes.post.time,
      color: '$depth3',
    },
  },
  ({ theme }) => ({
    '& p.time': {
      color: theme.colors.text.greyed,
    },
  })
);
