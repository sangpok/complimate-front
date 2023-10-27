import { css, styled } from '@/stitches.config';
import type * as Stitches from '@stitches/react';

export const buttonStyles = css({
  all: 'unset',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$small',

  borderRadius: '$small',

  textAlign: 'center',

  '&:focus-visible': {
    border: '3px solid lightblue',
  },

  variants: {
    size: {
      lg: {
        padding: '$double 0',
        fontSize: '$button-lg',
        fontWeight: 'bold',
      },
      sm: {
        padding: '$default 0',
        fontSize: '$button-lg',
        fontWeight: 'bold',
      },
    },
    type: {
      normal: {
        backgroundColor: '$point',
        color: '$bg',
      },
      google: {
        border: '1px solid $depth2',
        backgroundColor: '$bg',
        color: '$body',
      },
    },
  },

  defaultVariants: {
    type: 'normal',
  },
});

const ButtonInner = styled('button', buttonStyles);

type ButtonProp = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
} & Stitches.VariantProps<typeof ButtonInner>;

const Button = ({ icon, children, ...props }: ButtonProp) => {
  return (
    <ButtonInner {...props}>
      {icon}
      {children}
    </ButtonInner>
  );
};

export default Button;
