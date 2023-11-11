import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent, ReactNode } from 'react';

export type PrevProp = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export type TitleProp = {
  children: ReactNode;
};

export type NextProp = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
