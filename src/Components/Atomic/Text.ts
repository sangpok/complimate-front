import { styled } from '../../stitches.config';

export const Text = styled('p', {
  fontSize: '1rem',
  color: '$body',

  variants: {
    type: {
      logo: {
        fontSize: '$logo',
        fontWeight: '900',
        color: '$point',
        textAlign: 'center',
      },
      caption: {
        fontSize: '$caption',
        fontWeight: 'normal',
        color: '$body',
        textAlign: 'center',
      },
      button: {
        fontSize: '$button',
        fontWeight: 'bolder',
        color: '$bg',
        textAlign: 'center',
      },
    },
  },
});
