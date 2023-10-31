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
