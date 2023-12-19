import { Tokens } from '@Styles/tokens';
import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react';
const { radii } = Tokens;

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
  },
  ({ theme, col }) => ({
    flexDirection: col ? 'column' : 'row',

    // width: col ? 'auto' : 'fit-content',
    // height: col ? 'fit-content' : 'auto',
    // aspectRatio: '1 / 1 ',

    '&:active': {
      ...radii.small,
      background: theme.colors.background.active,
    },

    '&:disabled': {
      color: theme.colors.button.disabled,
    },
  })
);

type IconButtonProp = PropsWithChildren<
  ButtonProp & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

export const IconButton = ({ children, ...rest }: IconButtonProp) => {
  return <Button {...rest}>{children}</Button>;
};
