import styled from '@emotion/styled';
import { MouseEvent, ReactNode } from 'react';

import * as Icon from '@Icons/index';
import * as S from './PageHeader.styled';
import { NextProp, PrevProp, TitleProp } from './PageHeader.types';
import { Tokens } from '@Styles/tokens';
const { sizes } = Tokens;

const LeftIcon = styled(Icon.Left)<{ disabled?: boolean }>(
  {
    width: sizes.icon.default,
    height: sizes.icon.default,
  },
  ({ disabled, theme }) => ({
    color: disabled ? theme.colors.icon.disabled : theme.colors.icon.default,
  })
);

const Prev = ({ disabled, onClick, ...rest }: PrevProp) => {
  return (
    <S.PrevButton disabled={disabled} type="button" onClick={onClick} {...rest}>
      <LeftIcon disabled={disabled} />
    </S.PrevButton>
  );
};

const Title = ({ children }: TitleProp) => {
  return <S.TitleInner>{children}</S.TitleInner>;
};

const Next = ({ children, disabled, onClick, ...rest }: NextProp) => {
  return (
    <S.SubmitButton disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </S.SubmitButton>
  );
};

const Root = ({ children }: { children: ReactNode }) => {
  return <S.Container>{children}</S.Container>;
};

export { Root, Prev, Title, Next };
