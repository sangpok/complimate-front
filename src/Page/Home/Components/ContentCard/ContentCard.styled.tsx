import { styled } from '@/stitches.config';
import { motion } from 'framer-motion';

export const CardContainer = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$default',
  width: '100%',
  height: '100%',

  padding: '0 $double',
  position: 'absolute',
  touchAction: 'none',
});

export const CardHedaer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const Sticker = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  button: {
    all: 'unset',
  },

  p: {
    fontSize: '$button-sm',
    fontWeight: '700',
    color: '$point',
  },
});

export const CardBody = styled(motion.section, {
  flex: 1,
  overflowX: 'hidden',
  overflowY: 'scroll',
  scrollbarWidth: 'none',
  position: 'relative',
  touchAction: 'none',

  '& div.cc-body-text': {
    fontSize: '$content',
    fontWeight: 'normal',
    color: '$body',
    lineHeight: '$cc-content',
    whiteSpace: 'pre-line',
    willChange: 'transform',
  },

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  '&:before': {
    content: '',
    width: '100%',
    height: '48px',
    position: 'absolute',
    left: 0,
    bottom: 0,
    background: 'linear-gradient(transparent, white)',
    pointerEvents: 'none',
  },
});

export const Nickname = styled('span', {
  fontSize: '$author',
  fontWeight: '600',
});

export const Time = styled('span', {
  fontSize: '$time',
  fontWeight: 'normal',
  color: '$depth3',
});

export const BestCommentHeader = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const BestCommentInfo = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'end',
  gap: '$smaller',
});

export const CommentMenu = styled('button', {
  all: 'unset',
});

export const CommentBody = styled('p', {
  fontSize: '$content',
  fontWeight: 'normal',
  lineHeight: '$cc-content',
  whiteSpace: 'pre-line',
});

export const CommentLike = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$smaller',

  span: {
    fontSize: '.875rem',
    fontWeight: '600',
    color: '$point',
  },
});

export const BestCardContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$smaller',
  borderRadius: '$large',
  background: '$depth1',
  padding: '$default',
  boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, .1)',
});

export const MoreButton = styled('button', {
  all: 'unset',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$default',
  width: '100%',
  borderRadius: '$large',
  background: '$depth1',
  padding: '$default 0',
  boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, .1)',

  span: {
    fontSize: '$body',
    fontWeight: '600',
    color: '$point',
  },
});

export const BestCommentSection = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$double',
  marginBottom: '$quard',
  width: '100%',
});

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

export const Comment = styled('div', {
  padding: '$default 0',
});

export const CommentContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$default',

  'div.top': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$smaller',
  },

  'p.body': {
    fontSize: '$comment',
    lineHeight: '$comment',
    whiteSpace: 'pre-line',
  },
});

export const CommentHead = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  'div.left': {
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

export const CommentFoot = styled('div', {
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

export const ReplyComment = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '$double',
});

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
