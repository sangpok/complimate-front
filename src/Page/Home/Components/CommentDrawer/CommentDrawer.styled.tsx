import * as Dialog from '@radix-ui/react-dialog';
import { styled } from '@/stitches.config';
import { motion } from 'framer-motion';

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
