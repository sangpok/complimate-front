import { ChangeEvent, ComponentType, ReactNode, RefObject } from 'react';

export type FormDataProps = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

export type AnimateTitleProp = {
  title: string;
  children: ReactNode;
};

export type AnimateFormProp = {
  title: string;
  children: ReactNode;
};

export type PasswordFormProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
} & Partial<FormDataProps>;

export type EmailFormProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
} & Partial<FormDataProps>;

export type NicknameFormProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
} & Partial<FormDataProps>;
