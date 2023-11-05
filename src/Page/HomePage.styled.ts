import { styled } from '@/stitches.config';
import { motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import * as Layout from '@Layouts/DefaultLayout';

export const PageContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100dvw',
  height: '100dvh',
});

export const ContentSectionWrapper = styled('div', {
  flex: 1,
  position: 'relative',
  // width:
});

export const ContentSection = styled(motion.section, {
  // flex: 1,
  position: 'absolute',
  // marginTop: '$content',
  // paddingTop: '$content',
  width: '100%',
  height: '100%',
  // border: '1px solid red',
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

export const DrawerContent = styled(motion(Dialog.Content), {
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
