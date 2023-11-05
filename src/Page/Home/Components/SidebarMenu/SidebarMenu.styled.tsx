import { styled } from '@/stitches.config';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';

export const DialogOverlay = styled(motion(Dialog.Overlay), {
  background: 'rgba(0 0 0 / 0.5)',
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  zIndex: 99,
  willChange: 'opacity',
});

export const DialogContent = styled(motion(Dialog.Content), {
  maxWidth: '18.75rem',
  width: '70%',
  height: '100%',
  background: 'white',
  padding: '30px',
  willChange: 'transform',
});

export const SideBarInner = styled('aside', {
  width: '100%',
  height: '100%',
  padding: '$small',
  position: 'relative',

  footer: {
    display: 'flex',
    flexDireciton: 'row',
    alignItems: 'center',
    gap: '$smaller',
    fontSize: '$menu',
    fontWeight: '800',

    position: 'absolute',
    bottom: '$default',
    color: '$point',
  },
});

export const SideBarHeader = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '$quard',

  '& div.group': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '$default',

    button: {
      all: 'unset',
      lineHeight: '0',
    },

    p: {
      fontSize: '$menu',
      fontWeight: '600',
    },
  },

  '& button': {
    all: 'unset',
    lineHeight: '0',
  },
});

export const MenuList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$default',

  li: {
    all: 'unset',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '$default',

    padding: '$default 0',

    fontSize: '$menu',
    fontWeight: '500',

    '&.disabled': {
      color: '$depth3',
    },

    '&.selected': {
      fontWeight: '700',
      color: '$point',
    },

    '&:not(&.disabled):active': {
      borderRadius: '$small',
      background: '$depth1',
    },
  },
});

export const MenuHead = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const MenuInner = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const MenuFooter = styled('div', {
  display: 'flex',
  flexDireciton: 'row',
  alignItems: 'center',
  gap: '$smaller',
  fontSize: '$menu',
  fontWeight: '800',
  color: '$point',
});
