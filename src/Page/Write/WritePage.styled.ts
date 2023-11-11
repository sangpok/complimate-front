import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
const { space, fontSizes, radii, borderWidths } = Tokens;

export const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: space.default,

  padding: space.double,
});

export const Time = styled('span')(
  {
    ...fontSizes.default,
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
  })
);
