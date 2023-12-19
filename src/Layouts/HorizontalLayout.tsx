import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';

import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
const { space } = Tokens;

const Horizontal = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Container = styled(Horizontal)({
  width: '100%',
});

type GroupWrapperProp = {
  gap?: string;
};

const GroupWrapper = styled(Horizontal)<GroupWrapperProp>({}, ({ gap }) => ({
  gap,
}));

type HorizontalLayoutProp = PropsWithChildren<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;

export const Root = ({ children, ...rest }: HorizontalLayoutProp) => {
  return <Container {...rest}>{children}</Container>;
};

type HorizontalLayoutGroupProp = PropsWithChildren<GroupWrapperProp>;

export const Group = ({ children, ...rest }: HorizontalLayoutGroupProp) => {
  return <GroupWrapper {...rest}>{children}</GroupWrapper>;
};

export const HorizontalLayout = { Root, Group };
