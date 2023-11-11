import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
const { space, fontSizes, lineHeights, radii, sizes } = Tokens;
import { motion } from 'framer-motion';

import * as Icon from '@Icons/index';
import DraggableComponent from '@Components/DraggableComponent';

// export const HeartFilIcon = styled(Icon.HeartFill)({}, ({ theme }) => ({
//   color: theme.colors.icon.point,
// }));

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

export const BestCommentHeader = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const BestCommentInfo = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'end',
  gap: space.smaller,
});

export const CommentMenu = styled('button')({
  all: 'unset',
});

export const CommentBody = styled('p')({
  ...fontSizes.post.content,
  ...lineHeights.comment,
  fontWeight: 'normal',
  whiteSpace: 'pre-line',
});

export const CommentLike = styled.div(
  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: space.smaller,

    span: {
      ...fontSizes.post.like,
      fontWeight: '600',
    },
  },
  ({ theme }) => ({
    span: {
      color: theme.colors.text.point,
    },
  })
);

export const BestCardContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const StyledDraggableComponent = styled(DraggableComponent)({
  whiteSpace: 'nowrap',
  width: '100%',
});

export const MoreButton = styled('button')(
  {
    all: 'unset',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: space.default,
    width: '100%',
    ...radii.large,
    padding: `${space.default} 0`,
    boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, .1)',

    span: {
      ...fontSizes.button.text,
      fontWeight: '600',
      color: '$point',
    },
  },
  ({ theme }) => ({
    background: theme.colors.background.depth,
    span: { color: theme.colors.button.point },
  })
);

export const BestCommentSection = styled('section')({
  display: 'flex',
  flexDirection: 'column',
  gap: space.double,
  marginBottom: space.quard,
  width: '100%',
});

// export const Nickname = styled('span')({
//   ...fontSizes.post.author,
//   fontWeight: '600',
// });

export const Time = styled('span')(
  {
    ...fontSizes.post.time,
    fontWeight: 'normal',
  },
  ({ theme }) => ({
    color: theme.colors.text.greyed,
  })
);

// export const BestCommentListWrapper = styled.div({
//   display: 'flex',
//   flexDirection: 'row',
//   width: '100%',
//   flexWrap: 'nowrap',
//   whiteSpace: 'nowrap',
//   gap: space.default,
// });

export const ScrollBestCommentContainer = styled(motion.div)({
  width: '100%',
  // overflowX: 'scroll',
  // paddingRight: space.small,
});

export const FixedWidth = styled.div(
  {
    width: '100%',
    display: 'inline-flex',
    padding: space.default,
    ...radii.large,
    boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, .1)',
    // flex: 'none',

    '& + &': {
      marginLeft: space.default,
    },
  },
  ({ theme }) => ({
    background: theme.colors.background.depth,
  })
);
