import { styled } from '@/stitches.config';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const FullPage = styled('div', {
  // position: 'relative',
});

export const LogoWrapper = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$double',
  marginTop: '$quard',

  width: '100%',
  position: 'absolute',
  top: 0,
});

export const Content = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100dvh',
  width: '100dvw',

  marginTop: '4rem',
  padding: '0 2rem',

  position: 'absolute',

  '& h1': {
    fontSize: '$tutorial-title',
    marginBottom: '$double',
  },

  '& p': {
    fontSize: '$tutorial-content',
    fontWeight: 600,
    lineHeight: '$tutorial-content',

    '& strong': {
      color: '$point',
    },
  },
});

export const Nav = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$smaller',
  width: '100%',
  marginBottom: '$quard',

  position: 'absolute',
  bottom: 0,
});

export const Circle = styled('div', {
  width: '$nav',
  height: '$nav',
  borderRadius: '999px',
  background: '$depth2',

  '&.selected': {
    background: '$point',
  },
});

export const ButtonSection = styled(motion.div, {
  position: 'absolute',
  bottom: '0',
  width: '100%',
  padding: '0 $double',
  display: 'flex',
  marginBottom: 'calc($quard * 2)',
});

export const StyledLink = styled(Link, {
  all: 'unset',

  width: '100%',
  fontSize: '$button-text',
  fontWeight: 700,
  padding: '$default $double',
  color: '$bg',
  background: '$point',
  textAlign: 'center',
  borderRadius: '$small',
  boxShadow: '0 0 10px 1px rgba(0, 0, 0, .2)',
});
