import { styled } from '@/stitches.config';

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '$smaller',

  variants: {
    type: {
      normal: {
        '& span': {
          fontSize: '$author',
          color: '$body',
        },
      },
      post: {
        '& span': {
          fontSize: '$author',
          color: '$depth3',
        },
      },
      'replay-target': {
        gap: '.25rem',

        '& span': {
          fontSize: '$caption',
          color: '$depth3',

          strong: {
            color: '$body',
          },
        },
      },
    },
  },
});

export const Profile = styled('div', {
  display: 'block',
  width: '$profile-sm',
  height: '$profile-sm',
  overflow: 'hidden',
  borderRadius: '9999px',
  backgroundPosition: 'center',
  backgroundSize: 'cover',

  variants: {
    type: {
      'replay-target': {
        width: '$profile-replay-target',
        height: '$profile-replay-target',
      },
    },
  },
});
