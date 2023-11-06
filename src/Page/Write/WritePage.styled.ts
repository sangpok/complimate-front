import { styled } from '@/stitches.config';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$default',

  padding: '$double',
});

export const Time = styled('span', {
  fontSize: '$default',
  color: '$depth3',
});

export const Textarea = styled('textarea', {
  all: 'unset',

  display: 'block',
  fontSize: '$input',
  color: '$body',
  width: '100%',

  '&:disabled': {
    color: '$depth2',
  },
});

export const TextCount = styled('p', {
  fontSize: '$comment',
  color: '$depth3',
  textAlign: 'end',
});

export const ImageAddButton = styled('button', {
  all: 'unset',

  display: 'block',
  boxSizing: 'border-box',
  padding: '$smaller $default',

  border: '1px solid $point',
  borderRadius: '$small',
  width: '100%',

  color: '$point',
  fontSize: '$button-text',
  fontWeight: '600',
  textAlign: 'center',
});
