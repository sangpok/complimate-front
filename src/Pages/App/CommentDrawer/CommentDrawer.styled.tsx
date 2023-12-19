import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Tokens } from '@Styles/tokens';
import { IconButton } from '@Components/IconButton';
import { VerticalLayout } from '@Layouts/VerticalLayout';
import { HorizontalLayout } from '@Layouts/HorizontalLayout';
import DraggableComponent from '@Components/DraggableComponent';
const { space, radii, sizes, fontSizes, borderWidths } = Tokens;

export const Background = styled(DraggableComponent)(
  {
    position: 'absolute',
    top: space.content,
    left: 0,
    width: '100%',
    height: `calc(100% - ${space.content})`,
    padding: space.double,
    zIndex: 99,
    willChange: 'transform',
    ...radii.large,
    boxShadow: '0 0 25px 1px rgba(0, 0, 0, .1)',
  },
  ({ theme }) => ({
    background: theme.colors.background.depth,
  })
);

export const DrawerHandle = styled.div(
  {
    width: '100%',
    height: sizes.drawer.height,
    padding: `${space.default} 0`,

    'div.handle': {
      width: sizes.drawer.handleWidth,
      height: sizes.drawer.handleHeight,
      ...radii.full,
      margin: '0 auto',
    },
  },
  ({ theme }) => ({
    'div.handle': {
      background: theme.colors.background.point,
    },
  })
);

export const SortButton = styled(IconButton)({}, ({ theme }) => ({
  color: theme.colors.button.point,
}));

export const SmallCircleProfile = styled.div<{ url?: string }>(
  {
    ...radii.full,
    display: 'inline-block',
    width: sizes.profile.small,
    height: sizes.profile.small,
    overflow: 'hidden',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  ({ url }) => {
    if (url) {
      return { backgroundImage: `url('${url}')` };
    }
  }
);
export const ItemContainer = styled(VerticalLayout)(
  {
    gap: space.small,
    display: 'flex',
    width: '100%',

    'p.date': {
      ...fontSizes.post.time,
      fontWeight: 'normal',
      alignSelf: 'end',
    },

    '& + &': {
      marginTop: space.default,
    },
  },
  ({ theme }) => ({
    background: theme.colors.background.depth,

    'p.date': { color: theme.colors.text.greyed },
  })
);

export const CommentLayout = styled.div({
  '& + &': {
    marginTop: space.default,
  },
});

export const ReplyBox = styled.ul(
  {
    marginTop: space.default,
    marginLeft: space.double,
  },
  ({ theme }) => ({
    background: theme.colors.background.depth,
  })
);

export const CommentFootLayout = styled(HorizontalLayout.Root)(
  {
    ...fontSizes.button.sm,
    fontWeight: '500',
  },
  ({ theme }) => ({
    color: theme.colors.button.point,
  })
);

export const WriteSection = styled(HorizontalLayout.Root)(
  {
    ...radii.small,

    '& > button': {
      all: 'unset',
      width: sizes.button.comment,
      height: '100%',
      fontWeight: 500,
      textAlign: 'center',
    },
  },
  ({ theme }) => ({
    border: `${borderWidths.base._1} solid ${theme.colors.border.point}`,

    '& > button': {
      background: theme.colors.button.point,
      color: theme.colors.button.inversion,

      '&:disabled': {
        background: theme.colors.button.disabled,
      },
    },
  })
);

export const InputBoxWrapper = styled(VerticalLayout)({
  flex: 1,

  padding: `${space.base._4} ${space.default}`,

  input: {
    all: 'unset',
    flex: 1,

    height: '100%',
    width: '100%',
    padding: `${space.smaller} 0`,

    ...fontSizes.input,
  },
});
