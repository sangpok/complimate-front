import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Tokens } from '@Styles/tokens';
const { fontSizes, radii, space, colors, borderWidths } = Tokens;

export const LogoText = styled.p(
  {
    ...fontSizes.logo,
    fontWeight: 900,
    textAlign: 'center',
  },
  ({ theme }) => ({ color: theme.colors.text.point })
);

export const CaptionText = styled.p(
  {
    ...fontSizes.caption,
    fontWeight: 'normal',
    textAlign: 'center',
    width: '100%',
  },
  ({ theme }) => ({ color: theme.colors.text.greyed })
);

export const RegisterButton = styled(Link)(
  {
    all: 'unset',
    ...fontSizes.button.lg,
    ...radii.small,
    fontWeight: 600,
    width: '100%',
    textAlign: 'center',
    padding: `${space.default} 0`,
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
    background: theme.colors.background.point,
    color: theme.colors.button.inversion,
  })
);

export const GoogleButtonInner = styled(Link)({
  all: 'unset',
  ...fontSizes.button.sm,
  ...radii.small,
  fontWeight: 700,
  width: '100%',
  textAlign: 'center',
  padding: `${space.smaller} ${space.default}`,
  background: colors.base.white,
  color: colors.base.black,
  border: `${borderWidths.base._1} solid ${colors.base.gray6}`,
  position: 'relative',

  '&:focus-visible': {
    '&::before': {
      content: `""`,
      position: 'absolute',
      top: '-0.1875rem',
      left: '-0.1875rem',
      width: '100%',
      height: '100%',
      border: `.1875rem solid rgb(167, 187, 255)`,
      borderRadius: '.4375rem',
    },
  },
});
