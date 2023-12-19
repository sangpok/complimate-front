// const Container = styled('header', {
//   display: 'flex',
//   flexDirection: 'row',
//   justifyContent: 'center',
//   alignItems: 'center',
//   gap: '$small',

//   background: '$bg',
//   color: 'theme.colors.bg',

//   height: '5rem',
//   padding: '0 $default',
// });

// const PrevButton = styled('button', {
//   all: 'unset',
//   display: 'flex',
//   padding: '$smaller',

//   '&:disabled': {
//     color: '$depth2',
//   },
// });

// const TitleInner = styled('p', {
//   flex: 1,
//   fontSize: '$header',
//   fontWeight: 600,
// });

// Icon.Left.toString = () => '.left-icon';

// const SubmitButton = styled('button', {
//   all: 'unset',

//   display: 'flex',
//   padding: '$default',

//   fontSize: '$button-text',
//   fontWeight: 600,
//   color: '$point',

//   // border: '1px solid red',
// });

// const Root = ({ children }: { children: ReactNode }) => {
//   return <Container>{children}</Container>;
// };

import styled from '@emotion/styled';

import { Tokens } from '@Styles/tokens';
const { borderWidths, fontSizes, sizes, space } = Tokens;

export const Container = styled('header')(
  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: space.small,

    height: sizes.header.default,
    padding: `0 ${space.default}`,
  },
  ({ theme }) => ({
    background: theme.colors.background.default,
    color: theme.colors.text.default,
  })
);

export const PrevButton = styled('button')(
  {
    all: 'unset',
    display: 'flex',
    padding: space.smaller,
    position: 'relative',

    '&:focus-visible': {
      '&::before': {
        content: `""`,
        position: 'absolute',
        inset: '-0.1875rem',
        border: `.1875rem solid rgb(167, 187, 255)`,
        borderRadius: '.4375rem',
      },
    },
  },
  ({ theme }) => ({
    '&:disabled': {
      color: theme.colors.button.disabled,
    },
  })
);

export const TitleInner = styled('p')({
  ...fontSizes.header,
  flex: 1,
  fontWeight: 600,
});

export const SubmitButton = styled('button')(
  {
    all: 'unset',

    display: 'flex',
    padding: space.default,

    ...fontSizes.button.text,
    // fontSize: '$button-text',
    fontWeight: 600,
    // color: '$point',

    // border: '1px solid red',
    position: 'relative',

    '&:focus-visible': {
      '&::before': {
        content: `""`,
        position: 'absolute',
        inset: '-0.1875rem',
        border: `.1875rem solid rgb(167, 187, 255)`,
        borderRadius: '.4375rem',
      },
    },
  },
  ({ theme }) => ({
    color: theme.colors.button.point,

    '&:disabled': {
      color: theme.colors.button.disabled,
    },
  })
);
