import { styled } from '@/stitches.config';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

// const Container = styled('div', {
//   width: '100%',
// });

const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'colunm',
  justifyContent: 'center',
  alignItems: 'center',

  padding: '$default',
  gap: '$default',
  zIndex: 0,

  border: '.0625rem solid $depth2',

  svg: {
    color: '$depth2',
  },

  '& + &': {
    marginTop: '-0.0625rem',
  },

  '&:focus-within': {
    border: '.0625rem solid $point',
    boxShadow: '0 0 .625rem .0625rem rgba(0, 0, 0, .1)',
    position: 'relative',
    zIndex: 1,

    svg: {
      color: '$point',
    },
  },

  '&:first-of-type': {
    borderTopLeftRadius: '$small',
    borderTopRightRadius: '$small',
  },

  '&:last-of-type': {
    borderBottomLeftRadius: '$small',
    borderBottomRightRadius: '$small',
  },
});

const InputInner = styled('input', {
  all: 'unset',

  flex: 1,
  fontSize: '$input',
  width: '100%',
  border: '.0625rem solid transparent',
  background: '$input',

  '&:disabled': {
    color: '$depth2',
  },
});

const Root = ({ children }: { children: ReactNode }) => {
  return <div style={{ width: '100%' }}>{children}</div>;
};

type ContentProp = {
  icon: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Content = forwardRef(({ icon, ...rest }: ContentProp, ref) => {
  return (
    <InputContainer>
      {icon}
      <InputInner {...rest} ref={ref} />
    </InputContainer>
  );
});

export { Content, Root };
