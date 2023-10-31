import { styled } from '@/stitches.config';

export const CCUserInfoContainer = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  '& p.time': {
    fontSize: '$time',
    color: '$depth3',
  },
});
