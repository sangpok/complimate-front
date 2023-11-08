import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

const { radii, space, borderWidths, fontSizes } = Tokens;

const InputContainer = styled.div(
  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    padding: space.default,
    gap: space.default,
    zIndex: 0,

    '& + &': {
      marginTop: `-${space.base._1}`,
    },

    '&:first-of-type': {
      borderTopLeftRadius: radii.tokens.small,
      borderTopRightRadius: radii.tokens.small,
    },

    '&:last-of-type': {
      borderBottomLeftRadius: radii.tokens.small,
      borderBottomRightRadius: radii.tokens.small,
    },
  },
  ({ theme }) => ({
    border: `${borderWidths.base._1} solid ${theme.colors.border.depth}`,

    svg: {
      color: theme.colors.icon.disabled,
    },

    '&:focus-within': {
      border: `${borderWidths.base._1} solid ${theme.colors.border.point}`,
      boxShadow: `0 0 .625rem ${space.base._1} rgba(0, 0, 0, .1)`,
      position: 'relative',
      zIndex: 1,

      svg: {
        color: theme.colors.icon.point,
      },
    },
  })
);

const InputInner = styled.input(
  {
    all: 'unset',

    flex: 1,
    ...fontSizes.input,
    width: '100%',
    border: `${borderWidths.default} solid transparent`,
  },
  ({ theme }) => ({
    background: theme.colors.input.background,

    '&:disabled': {
      color: theme.colors.input.disabled,
    },
  })
);

const Root = ({ children }: { children: ReactNode }) => {
  return <div style={{ width: '100%' }}>{children}</div>;
};

type ContentProp = {
  icon: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Content = forwardRef<HTMLInputElement, ContentProp>(({ icon, ...rest }: ContentProp, ref) => {
  return (
    <InputContainer>
      {icon}
      <InputInner {...rest} ref={ref} />
    </InputContainer>
  );
});

export { Content, Root };
