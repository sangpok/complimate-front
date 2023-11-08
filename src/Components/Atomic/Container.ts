import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
const { space, media } = Tokens;

export const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: space.default,
  width: '100%',
  maxWidth: 'calc(100% - 3rem)',
  margin: '0 auto',

  [media.md]: {
    maxWidth: 'calc(100% - 9rem)',
  },

  [media.lg]: {
    maxWidth: 'calc(100% - 18rem)',
  },

  [media.xl]: {
    maxWidth: 'calc(100% - 36rem)',
  },
});
