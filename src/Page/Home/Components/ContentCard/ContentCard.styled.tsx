import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import * as Icon from '@Icons/index';

import { Tokens } from '@Styles/tokens';
const { space, fontSizes, sizes, lineHeights, radii } = Tokens;

export const HeartFilIcon = styled(Icon.HeartFill)({}, ({ theme }) => ({
  color: theme.colors.icon.point,
}));

export const HeartIcon = styled(Icon.Heart)({}, ({ theme }) => ({
  color: theme.colors.icon.point,
}));

export const MoreIcon = styled(Icon.More)(
  {
    width: sizes.base._18,
    height: sizes.base._18,
  },
  ({ theme }) => ({ color: theme.colors.text.greyed })
);

export const CommentIcon = styled(Icon.Comment)({}, ({ theme }) => ({
  color: theme.colors.icon.point,
}));

export const CardContainer = styled(motion.div)({
  display: 'flex',
  flexDirection: 'column',
  gap: space.default,
  width: '100%',
  height: '100%',

  padding: `0 ${space.double}`,
  position: 'absolute',
  touchAction: 'none',
});

export const CardHedaer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const CardBody = styled(motion.section)({
  flex: 1,
  overflowX: 'hidden',
  overflowY: 'scroll',
  scrollbarWidth: 'none',
  position: 'relative',
  touchAction: 'none',

  '& div.cc-body-text': {
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

  '&:before': {
    content: `""`,
    width: '100%',
    height: sizes.base._48,
    position: 'absolute',
    left: 0,
    bottom: 0,
    background: 'linear-gradient(transparent, white)',
    pointerEvents: 'none',
  },
});
