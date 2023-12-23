import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';

const { space, radii, borderWidths, sizes, fontSizes } = Tokens;

import * as Icon from '@Icons/index';

export const Container = styled.div(
  {
    width: '100%',
    padding: `${space.default} ${space.base._18}`,
    ...radii.small,
  },
  ({ theme }) => ({
    border: `${borderWidths.base._1} solid ${theme.colors.border.point}`,
  })
);

export const InnerLayout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: space.default,
  width: '100%',
  height: '100%',
});

export const ProfileSection = styled.div(
  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

    'div.group': {
      flex: 1,
      marginLeft: space.default,

      'p.nickname': {
        ...fontSizes.default,
        fontWeight: 700,
      },

      'p.handle-id': {
        ...fontSizes.caption,
      },
    },
  },
  ({ theme }) => ({
    'div.group': {
      'p.handle-id': {
        color: theme.colors.text.greyed,
      },
    },
  })
);

export const CCSection = styled.div(
  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',

    'div.group': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.smaller,

      'div.detail': {
        'p.description': {
          ...fontSizes.caption,
          fontWeight: '500',
        },

        'p.count': {
          ...fontSizes.large,
        },
      },
    },
  },
  ({ theme }) => ({
    color: theme.colors.text.point,
  })
);

export const GiveHeartIcon = styled(Icon.GiveHeart)(
  {
    width: sizes.icon.feedProfile,
    height: sizes.icon.feedProfile,
  },
  ({ theme }) => ({
    color: theme.colors.icon.point,
  })
);

export const TakenHeartIcon = styled(Icon.TakenHeart)(
  {
    width: sizes.icon.feedProfile,
    height: sizes.icon.feedProfile,
  },
  ({ theme }) => ({
    color: theme.colors.icon.point,
  })
);

export const ProfileImage = styled.div<{ profile: string }>(
  {
    width: sizes.profile.medium,
    height: sizes.profile.medium,
    ...radii.full,
    overflow: 'hidden',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  ({ profile }) => ({
    backgroundImage: `url('${profile}')`,
  })
);
