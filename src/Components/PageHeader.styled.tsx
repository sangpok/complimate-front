import { styled } from '@/stitches.config';

import { motion } from 'framer-motion';
import { Text } from './Atomic';

import { ReactComponent as LeftIconInner } from '@Icons/mdi_chevron-left.svg';

export const Header = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$default',
  backgroundColor: '$bg',
  padding: '$double',

  position: 'fixed',
  top: 0,
  left: 0,

  width: '100%',

  a: {
    all: 'unset',
  },

  button: {
    all: 'unset',
    display: 'flex',
  },
});

export const TitleWrapper = styled('div', {
  flex: 1,
  height: '1.3125rem',
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
});

export const Title = styled(motion(Text), {
  position: 'absolute',
});

export const LeftIcon = styled(LeftIconInner, {
  width: '$icon',
  height: '$icon',
});
