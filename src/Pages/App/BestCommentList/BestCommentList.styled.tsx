import styled from '@emotion/styled';
import { VerticalLayout } from '@Layouts/VerticalLayout';
import { Tokens } from '@Styles/tokens';

const { space, fontSizes, sizes, radii, lineHeights } = Tokens;

export const SmallCircleProfile = styled.div<{ url?: string }>(
  {
    ...radii.full,
    display: 'inline-block',
    width: sizes.profile.small,
    height: sizes.profile.small,
    overflow: 'hidden',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  ({ url }) => {
    if (url) {
      return { backgroundImage: `url('${url}')` };
    }
  }
);

export const ItemContainer = styled(VerticalLayout)(
  {
    ...radii.large,
    gap: space.small,
    padding: space.default,
    display: 'inline-flex',
    width: '100%',
    boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, .1)',

    'p.date': {
      ...fontSizes.post.time,
      fontWeight: 'normal',
      alignSelf: 'end',
    },

    '& + &': {
      marginLeft: space.default,
    },
  },
  ({ theme }) => ({
    background: theme.colors.background.depth,

    'p.date': { color: theme.colors.text.greyed },
  })
);
