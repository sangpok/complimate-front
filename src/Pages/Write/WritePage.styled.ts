import styled from '@emotion/styled';
import { PaddingLayout } from '@Layouts/PaddingLayout';
import { Tokens } from '@Styles/tokens';

const { space, fontSizes, sizes, radii, lineHeights, borderWidths } = Tokens;

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

export const WriterLayout = styled.div(
  {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: space.default,

    '& p.time': {
      ...fontSizes.post.time,
    },

    '& div.writer': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: space.smaller,
    },
  },
  ({ theme }) => ({
    color: theme.colors.text.greyed,
  })
);

export const Textarea = styled('textarea')(
  {
    all: 'unset',

    display: 'block',
    ...fontSizes.input,
    width: '100%',
    marginBottom: space.small,
  },
  ({ theme }) => ({
    color: theme.colors.text.default,

    '&:disabled': {
      color: theme.colors.text.greyed,
    },
  })
);

export const TextCount = styled('p')(
  {
    ...fontSizes.post.comment,
    textAlign: 'end',
  },
  ({ theme }) => ({
    color: theme.colors.text.greyed,
  })
);

export const ImageAddButton = styled('button')(
  {
    all: 'unset',

    display: 'block',
    boxSizing: 'border-box',
    padding: `${space.smaller} ${space.default}`,

    ...radii.small,
    width: '100%',

    ...fontSizes.button.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  ({ theme }) => ({
    border: `${borderWidths.base._1} solid ${theme.colors.button.point}`,
    color: theme.colors.button.point,

    '&:disabled': {
      border: `${borderWidths.base._1} solid ${theme.colors.button.disabled}`,
      color: theme.colors.button.disabled,
    },
  })
);
