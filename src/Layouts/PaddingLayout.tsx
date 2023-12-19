import React, { DetailedHTMLProps, HtmlHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';

const { space } = Tokens;

type ContainerProp = {
  paddingType?: string;
  wFull?: boolean;
  hFull?: boolean;
};

const Container = styled.div<ContainerProp>(({ paddingType, wFull, hFull }) => ({
  width: wFull ? '100%' : undefined,
  height: hFull ? '100%' : undefined,
  padding: paddingType === 'sideDouble' ? `0 ${space.double}` : space[paddingType] || undefined,
}));

type PaddingLayoutNormalProp = PropsWithChildren<
  ContainerProp & DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;

const Default = ({ children, ...rest }: PaddingLayoutNormalProp) => {
  return (
    <Container paddingType="default" {...rest}>
      {children}
    </Container>
  );
};

const Double = ({ children, ...rest }: PaddingLayoutNormalProp) => {
  return (
    <Container paddingType="double" {...rest}>
      {children}
    </Container>
  );
};

const SideDouble = ({ children, ...rest }: PaddingLayoutNormalProp) => {
  return (
    <Container paddingType="sideDouble" {...rest}>
      {children}
    </Container>
  );
};

export const PaddingLayout = { Default, Double, SideDouble };
