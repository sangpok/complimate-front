import { Tokens } from '@Styles/tokens';
import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';
const { radii, fontSizes, space } = Tokens;

import styled from '@emotion/styled';

type ButtonProp = {
  col?: boolean;
};

const Button = styled.button<ButtonProp>(
  {
    all: 'unset',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    ...fontSizes.button.text,
    fontWeight: '700',
    // padding: space.small,
  },
  ({ theme, col }) => ({
    color: theme.colors.text.point,
    flexDirection: col ? 'column' : 'row',

    '&:disabled': {
      color: theme.colors.text.greyed,
    },

    '&:active': {
      ...radii.small,
      background: theme.colors.background.active,
    },
  })
);

type TextButtonProp = PropsWithChildren<
  ButtonProp & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

export const TextButton = ({ children, ...rest }: TextButtonProp) => {
  return <Button {...rest}>{children}</Button>;
};
