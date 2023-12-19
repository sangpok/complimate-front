import { ReactNode } from 'react';
import { LinkProps } from 'react-router-dom';

export type GoogleButtonProp = {
  children: ReactNode;
} & LinkProps;
