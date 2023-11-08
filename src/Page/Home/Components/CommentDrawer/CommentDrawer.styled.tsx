import * as Dialog from '@radix-ui/react-dialog';
import * as Icon from '@Icons/index';
import * as Layout from '@Layouts/DefaultLayout';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Tokens } from '@Styles/tokens';
const { space, sizes, radii, fontSizes, lineHeights, borderWidths } = Tokens;

export const SortIcon = styled(Icon.Sort)(
  {
    width: sizes.icon.comment,
    height: sizes.icon.comment,
  },
  ({ theme }) => ({ color: theme.colors.icon.point })
);

export const MoreIcon = styled(Icon.More)(
  {
    width: sizes.icon.comment,
    height: sizes.icon.comment,
  },
  ({ theme }) => ({ color: theme.colors.text.greyed })
);

export const CommentIcon = styled(Icon.Comment)(
  {
    width: sizes.icon.comment,
    height: sizes.icon.comment,
  },
  ({ theme }) => ({ color: theme.colors.icon.point })
);

export const HeartIcon = styled(Icon.Heart)(
  {
    width: sizes.icon.comment,
    height: sizes.icon.comment,
  },
  ({ theme }) => ({ color: theme.colors.icon.point })
);

export const DeleteIcon = styled(Icon.Delete)(
  {
    width: sizes.icon.comment,
    height: sizes.icon.comment,
  },
  ({ theme }) => ({ color: theme.colors.icon.point })
);

export const ScrollBody = styled(Layout.Body)({
  overflowY: 'scroll',
  marginBottom: space.default,

  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

export const DrawerHandle = styled.div(
  {
    width: '100%',
    height: sizes.drawer.height,
    padding: `${space.default} 0`,

    'div.handle': {
      width: sizes.drawer.handleWidth,
      height: sizes.drawer.handleHeight,
      ...radii.full,
      margin: '0 auto',
    },
  },
  ({ theme }) => ({
    'div.handle': {
      background: theme.colors.background.point,
    },
  })
);

export const Drawer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
});

export const DrawerHead = styled.div(
  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: space.double,

    p: {
      ...fontSizes.drawer.header,
      fontWeight: 700,
    },

    button: {
      all: 'unset',

      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.smaller,

      ...fontSizes.button.sm,
    },
  },
  ({ theme }) => ({
    p: {
      color: theme.colors.text.point,
    },

    button: {
      color: theme.colors.button.point,
    },
  })
);

export const DrawerBody = styled.div({
  flex: 1,
  width: '100%',
  overflowY: 'scroll',
  marginBottom: space.default,

  'div.inner': {
    whiteSpace: 'nowrap',
  },
});

export const CommentItemInner = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: space.smaller,
  padding: `${space.default} 0`,
  // border: '1px solid red',
});

export const CommentItemHead = styled.div(
  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: space.small,

    'div.group': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'end',
      gap: space.small,

      'p.time': {
        ...fontSizes.caption,
        color: '$depth3',
      },
    },

    button: {
      all: 'unset',
    },
  },
  ({ theme }) => ({
    'div.group': {
      'p.time': {
        color: theme.colors.text.greyed,
      },
    },
  })
);

export const CommentItemBody = styled('p')(
  {
    ...fontSizes.post.comment,
    ...lineHeights.comment,
  },
  ({ theme }) => ({
    color: theme.colors.text.default,
  })
);

export const CommentItemFoot = styled.div(
  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    button: {
      all: 'unset',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: space.small,
      fontWeight: 500,
    },
  },
  ({ theme }) => ({
    button: {
      color: theme.colors.button.point,
    },
  })
);

export const CommentItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  // gap: '$default',
  // border: '1px solid red',
});

export const CommentReplyList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  // gap: '$double',
  paddingLeft: space.double,
});

export const CommentList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  // gap: '$double',
});

// export const CommentItem = styled.div`
//   display: 'flex',
//   flexDirection: column,
//   gap: '$default',
// });

// export const CommentList = styled.div`
//   display: 'flex',
//   flexDirection: column,
//   gap: '$default',
// });

// export const CommentItemInner = styled.div`
//   display: 'flex',
//   flexDirection: column,
//   gap: '$smaller',
// });

// export const CommentHead = styled.div`
//   display: 'flex',
//   flexDirection: 'row',
//   justifyContent: 'space-between',

//   'div.left': {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'end',
//     gap: '$small',

//     'p.time': {
//       fontSize: '$caption',
//       color: '$depth3',
//     },
//   },

//   button: {
//     all: 'unset',
//   },
// });

// export const CommentFoot = styled.div`
//   display: 'flex',
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center',

//   button: {
//     all: 'unset',

//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: '$small',
//     color: '$point',

//     fontWeight: 500,
//   },
// });

// export const ReplyComment = styled.div`
//   display: 'flex',
//   flexDirection: column,
//   paddingLeft: '$double',
// });

export const CommentSection = styled.div({});

export const DrawerFooter = styled.div(
  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    ...radii.small,

    '& > button': {
      all: 'unset',
      width: sizes.button.comment,
      height: '100%',
      fontWeight: 500,
      textAlign: 'center',
    },
  },
  ({ theme }) => ({
    border: `${borderWidths.base._1} solid ${theme.colors.border.point}`,

    '& > button': {
      background: theme.colors.button.point,
      color: theme.colors.button.inversion,
    },
  })
);

export const WriteInputBox = styled.div({
  flex: 1,

  padding: `${space.base._4} ${space.default}`,

  input: {
    all: 'unset',
    flex: 1,

    height: '100%',
    width: '100%',
    padding: `${space.smaller} 0`,

    ...fontSizes.input,
  },
});

export const ReplyTargetBox = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  button: {
    all: 'unset',
    lineHeight: 0,
  },
});

export const DrawerContent = styled(motion.div)(
  {
    position: 'absolute',
    top: space.content,
    left: 0,
    width: '100%',
    height: `calc(100% - ${space.content})`,
    padding: space.double,
    zIndex: 99,
    willChange: 'transform',
    ...radii.large,
    boxShadow: '0 0 25px 1px rgba(0, 0, 0, .1)',
  },
  ({ theme }) => ({
    background: theme.colors.background.depth,
  })
);

export const DrawerLayout = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const WriteContainer = styled.div(
  {
    // height: '56px',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    ...radii.small,

    height: '100%',

    '& > button': {
      all: 'unset',
      background: '$point',
      width: sizes.button.comment,
      height: '100%',
      color: '$bg',
      fontWeight: 500,
      textAlign: 'center',
    },
  },
  ({ theme }) => ({
    border: `${borderWidths.base._1} solid ${theme.colors.border.point}`,

    '& > button': {
      background: theme.colors.button.point,
      color: theme.colors.button.inversion,
    },
  })
);
