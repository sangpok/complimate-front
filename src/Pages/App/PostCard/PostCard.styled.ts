import styled from '@emotion/styled';
import { PaddingLayout } from '@Layouts/PaddingLayout';
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

export const WriterLayout = styled.div(
  {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',

    '& p.time': {
      ...fontSizes.post.time,
    },

    '& div.writer': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: space.smaller,
    },
  },
  ({ theme }) => ({
    color: theme.colors.text.greyed,
  })
);

export const HeartButtonContainer = styled.div(
  {
    'p.count': {
      ...fontSizes.button.sm,
      fontWeight: '600',
      textAlign: 'center',
    },
  },
  ({ theme }) => ({
    color: theme.colors.text.point,
  })
);

export const PostTextContent = styled.section({
  '& p': {
    ...fontSizes.post.content,
    ...lineHeights.postContent,
    fontWeight: 'normal',
    color: 'theme.colors.bg',
    whiteSpace: 'pre-line',
    willChange: 'transform',
  },

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  // '&:before': {
  //   content: `""`,
  //   width: '100%',
  //   height: sizes.base._48,
  //   position: 'absolute',
  //   left: 0,
  //   bottom: 0,
  //   background: 'linear-gradient(transparent, white)',
  //   pointerEvents: 'none',
  // },
});

export const MoreButton = styled('button')(
  {
    all: 'unset',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: space.default,
    width: '100%',
    ...radii.large,
    padding: `${space.default} 0`,
    boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, .1)',
    ...fontSizes.button.text,
    fontWeight: '700',
  },
  ({ theme }) => ({
    background: theme.colors.background.depth,
    color: theme.colors.button.point,
  })
);

export const FooterContainer = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: space.double,
  marginTop: space.default,
  marginBottom: space.quard,
});
