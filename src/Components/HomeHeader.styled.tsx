import { styled } from '@/stitches.config';

export const Header = styled('header', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$double',

  background: '$bg',
  zIndex: 9,

  position: 'sticky',
  top: 0,

  button: {
    all: 'unset',
  },

  '& div.right': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '$double',
  },
});
