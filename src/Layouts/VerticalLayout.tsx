import React, { DetailedHTMLProps, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import styled from '@emotion/styled';

type ContainerProp = {
  wFull?: boolean;
  hFull?: boolean;
};

const Container = styled.div<ContainerProp>(
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ({ wFull, hFull }) => ({
    width: wFull ? '100%' : undefined,
    height: hFull ? '100%' : undefined,
  })
);

type VerticalLayoutProp = PropsWithChildren<
  ContainerProp & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;

export const VerticalLayout = ({ children, ...rest }: VerticalLayoutProp) => {
  return <Container {...rest}>{children}</Container>;
};
