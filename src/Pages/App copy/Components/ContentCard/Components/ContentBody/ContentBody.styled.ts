import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
const { fontSizes, lineHeights, sizes, space } = Tokens;

export const ImageListSection = styled.div({
  paddingBottom: space.double,
});

export const ImageListSectionLayout = styled.div({
  width: '100%',
  height: '100%',
});

export const BodyContent = styled.section({
  '& p': {
    ...fontSizes.post.content,
    ...lineHeights.postContent,
    fontWeight: 'normal',
    color: 'theme.colors.bg',
    whiteSpace: 'pre-line',
    willChange: 'transform',
  },

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  // '&:before': {
  //   content: `""`,
  //   width: '100%',
  //   height: sizes.base._48,
  //   position: 'absolute',
  //   left: 0,
  //   bottom: 0,
  //   background: 'linear-gradient(transparent, white)',
  //   pointerEvents: 'none',
  // },
});
