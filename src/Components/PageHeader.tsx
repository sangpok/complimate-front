import { styled } from '@/stitches.config';
import { MouseEvent, ReactNode } from 'react';

import * as Icon from '@Icons/index';

const Container = styled('header', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$small',

  background: '$bg',
  color: '$body',

  height: '5rem',
  padding: '0 $default',
});

const PrevButton = styled('button', {
  all: 'unset',
  display: 'flex',
  padding: '$smaller',

  '&:disabled': {
    color: '$depth2',
  },
});

const TitleInner = styled('p', {
  flex: 1,
  fontSize: '$header',
  fontWeight: 600,
});

Icon.Left.toString = () => '.left-icon';

const SubmitButton = styled('button', {
  all: 'unset',

  display: 'flex',
  padding: '$default',

  fontSize: '$button-text',
  fontWeight: 600,
  color: '$point',

  // border: '1px solid red',
});

const Root = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>;
};

type PrevProp = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Prev = ({ disabled, onClick }: PrevProp) => {
  return (
    <PrevButton disabled={disabled} type="button" onClick={onClick}>
      <Icon.Left css={{ width: '$icon', height: '$icon', color: disabled ? '$depth2' : '$body' }} />
    </PrevButton>
  );
};

const Title = ({ children }: { children: ReactNode }) => {
  return <TitleInner>{children}</TitleInner>;
};

type NextProp = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Next = ({ children, disabled, onClick }: NextProp) => {
  return (
    <SubmitButton disabled={disabled} onClick={onClick}>
      {children}
    </SubmitButton>
  );
};

export { Root, Prev, Title, Next };
