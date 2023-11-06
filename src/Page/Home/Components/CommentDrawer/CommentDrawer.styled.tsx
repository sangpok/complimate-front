import * as Dialog from '@radix-ui/react-dialog';
import { styled } from '@/stitches.config';
import { motion } from 'framer-motion';

export const DrawerHandle = styled('div', {
  width: '100%',
  height: '50px',
  padding: '$default 0',

  'div.handle': {
    width: '2.8125rem',
    height: '.25rem',
    background: '$point',
    borderRadius: '999px',
    margin: '0 auto',
  },
});

export const Drawer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
});

export const DrawerHead = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '$double',

  p: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '$body',
  },

  button: {
    all: 'unset',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '$smller',

    color: '$point',

    fontSize: '$button-sm',
  },
});

export const DrawerBody = styled('div', {
  flex: 1,
  width: '100%',
  overflowY: 'scroll',
  marginBottom: '$default',

  'div.inner': {
    whiteSpace: 'nowrap',
  },
});

export const CommentItemInner = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$smaller',
  padding: '$default 0',
  // border: '1px solid red',
});

export const CommentItemHead = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '$small',

  'div.group': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'end',
    gap: '$small',

    'p.time': {
      fontSize: '$caption',
      color: '$depth3',
    },
  },

  button: {
    all: 'unset',
  },
});

export const CommentItemBody = styled('p', {
  fontSize: '$comment',
  lineHeight: '$comment',
  color: '$body',
});

export const CommentItemFoot = styled('div', {
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
    gap: '$small',
    color: '$point',
    fontWeight: 500,
  },
});

export const CommentItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  // gap: '$default',
  // border: '1px solid red',
});

export const CommentReplyList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  // gap: '$double',
  paddingLeft: '$double',
});

export const CommentList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  // gap: '$double',
});

// export const CommentItem = styled('div', {
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '$default',
// });

// export const CommentList = styled('div', {
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '$default',
// });

// export const CommentItemInner = styled('div', {
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '$smaller',
// });

// export const CommentHead = styled('div', {
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

// export const CommentFoot = styled('div', {
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

// export const ReplyComment = styled('div', {
//   display: 'flex',
//   flexDirection: 'column',
//   paddingLeft: '$double',
// });

export const CommentSection = styled('div', {});

export const DrawerFooter = styled('div', {
  // height: '56px',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  border: '1px solid $point',
  borderRadius: '$small',

  '& > button': {
    all: 'unset',
    background: '$point',
    width: '4rem',
    height: '100%',
    color: '$bg',
    fontWeight: 500,
    textAlign: 'center',
  },
});

export const WriteInputBox = styled('div', {
  flex: 1,

  padding: '.25rem $default',

  input: {
    all: 'unset',
    flex: 1,

    height: '100%',
    width: '100%',
    padding: '$smaller 0',

    fontSize: '$input',
  },
});

export const ReplyTargetBox = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  button: {
    all: 'unset',
    lineHeight: 0,
  },
});

export const DrawerContent = styled(motion.div, {
  position: 'absolute',
  top: '$content',
  left: 0,
  width: '100%',
  height: 'calc(100% - 5rem)',
  background: '$depth1',
  padding: '$double',
  zIndex: 99,
  willChange: 'transform',
  borderRadius: '$large',
  boxShadow: '0 0 25px 1px rgba(0, 0, 0, .1)',
});

export const DrawerLayout = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const WriteContainer = styled('div', {
  // height: '56px',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  border: '1px solid $point',
  borderRadius: '$small',

  height: '100%',

  '& > button': {
    all: 'unset',
    background: '$point',
    width: '4rem',
    height: '100%',
    color: '$bg',
    fontWeight: 500,
    textAlign: 'center',
  },
});
