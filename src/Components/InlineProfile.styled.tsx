import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
const { space, fontSizes, sizes, radii } = Tokens;

export const Container = styled.div<{ type?: 'normal' | 'post' | 'reply-target' }>(
  {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: space.smaller,
  },
  ({ theme, type }) => {
    if (type === 'normal') {
      return {
        '& span': {
          ...fontSizes.post.author,
          color: theme.colors.text.default,
        },
      };
    }

    if (type === 'post') {
      return {
        '& span': {
          ...fontSizes.post.author,
          color: theme.colors.text.greyed,
        },
      };
    }

    if (type === 'reply-target') {
      return {
        gap: space.base._4,

        '& span': {
          ...fontSizes.caption,
          color: theme.colors.text.greyed,
          strong: {
            color: theme.colors.text.point,
          },
        },
      };
    }
  }
);

export const Profile = styled.div<{ type?: 'reply-target' }>(
  {
    display: 'block',
    width: sizes.profile.small,
    height: sizes.profile.small,
    // minWidth: sizes.profile.small,
    // minHeight: sizes.profile.small,
    overflow: 'hidden',
    ...radii.full,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  ({ type }) => {
    if (type === 'reply-target') {
      return {
        width: sizes.profile.replyTarget,
        height: sizes.profile.replyTarget,
      };
    }
  }
);
