import { HorizontalLayout } from '@Layouts/HorizontalLayout';
import { VerticalLayout } from '@Layouts/VerticalLayout';
import { Tokens } from '@Styles/tokens';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const { space, fontSizes, sizes, radii, lineHeights } = Tokens;

export const StyledBackground = styled(motion.div)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100dvw',
  height: '100dvh',
  background: 'rgba(0, 0, 0, .5)',
});

export const StyledBox = styled(motion.div)({
  display: 'flex',

  position: 'relative',
  width: '80%',
  height: '80%',
  background: 'white',

  ...radii.large,
  overflow: 'hidden',
  boxShadow: '0 0 25px rgba(0, 0, 0, .3)',
});

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

export const ItemContainer = styled(VerticalLayout)(
  {
    gap: space.small,
    display: 'flex',
    width: '100%',

    'p.date': {
      ...fontSizes.post.time,
      fontWeight: 'normal',
      alignSelf: 'end',
    },

    '& + &': {
      marginTop: space.default,
    },
  },
  ({ theme }) => ({
    background: theme.colors.background.depth,

    'p.date': { color: theme.colors.text.greyed },
  })
);

export const CommentFootLayout = styled(HorizontalLayout.Root)(
  {
    ...fontSizes.button.sm,
    fontWeight: '500',
  },
  ({ theme }) => ({
    color: theme.colors.button.point,
  })
);

export const CommentLayout = styled.div({
  '& + &': {
    marginTop: space.default,
  },
});

export const ReplyBox = styled.ul(
  {
    marginTop: space.default,
    marginLeft: space.double,
  },
  ({ theme }) => ({
    background: theme.colors.background.depth,
  })
);

export const ScrollContainer = styled.div({
  height: '100%',
  overflowY: 'scroll',
  overflowX: 'hidden',

  '&::-webkit-scrollbar': {
    width: '16px',
  },

  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#606060',
    border: '4px solid transparent',
    borderRadius: '8px',
    backgroundClip: 'content-box',
  },
});

export const FeedPostContainer = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: space.default,
});

export const ContentContainter = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: space.default,
});

export const SelfRightAlign = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
});
