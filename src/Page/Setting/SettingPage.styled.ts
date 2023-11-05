import { styled } from '@/stitches.config';

export const ListGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$double',

  padding: '$double',
  paddingTop: 0,
});

export const Item = styled('li', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  background: '$depth1',

  padding: '$default',
  fontSize: '1rem',

  'span.name': {
    fontWeight: 600,
  },

  'div.right': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '$small',

    'span.placeholder': {
      fontSize: '$caption',
      fontWeight: 500,
      color: '$depth3',
    },

    button: {
      all: 'unset',
      display: 'flex',
    },
  },

  '&:active': {
    background: '$depth2',
    // color: '$bg',
  },
});

export const Group = styled('ul', {
  borderRadius: '$small',
  overflow: 'hidden',

  // border: '1px solid red',
});
