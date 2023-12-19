import { Variants } from 'framer-motion';
import { COLOR } from './PressableContextMenu.styled';

export const buttonVariant: Variants = {
  pushed: { scale: 0.9, background: '#f2f2f2' },
  normal: { scale: 1, background: '#fff' },
};

export const contextMenuVariants: Variants = {
  show: {
    scale: 1,
    opacity: 1,
    originY: 0,
    transition: {
      type: 'spring',
      duration: 0.5,
      delay: 0.2,
    },
  },

  hide: {
    scale: 0.9,
    opacity: 0,
  },
};
