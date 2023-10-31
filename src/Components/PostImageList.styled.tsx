import { styled } from '@/stitches.config';
import { motion } from 'framer-motion';

export const Container = styled('div', {
  marginBottom: '$double',
  touchAction: 'none',
});

export const Image = styled('div', {
  display: 'inline-block',
  width: `100%`,
  aspectRatio: '1 / 1',
  backgroundColor: '$depth2',
  // backgroundImage: `url('./tet.jpg')`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  borderRadius: '$small',

  '& + &': {
    marginLeft: '$default',
  },
});

export const ImageList = styled(motion.div, {
  whiteSpace: 'nowrap',
  overflow: 'visible',
  width: '100%',
  marginBottom: '$default',
});

export const ImageWrapper = styled(motion.div, {
  touchAction: 'pan-x',
});

export const ImageNavContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  gap: '$smaller',
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
