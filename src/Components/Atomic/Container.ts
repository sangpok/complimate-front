import { styled } from '../../stitches.config';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$default',
  width: '100%',
  maxWidth: 'calc(100% - 3rem)',
  margin: '0 auto',

  variants: {
    spacing: {
      lg: {
        gap: '$quard',
      },
    },
  },

  '@md': {
    maxWidth: 'calc(100% - 9rem)',
  },

  '@lg': {
    maxWidth: 'calc(100% - 18rem)',
  },

  '@xl': {
    maxWidth: 'calc(100% - 36rem)',
  },
});
