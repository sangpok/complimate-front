import { ChangeEvent, RefObject } from 'react';

export type FormDataProps = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

export type AnimateTitleProp = {
  title: string;
  progressDirection: number;
};

export type AnimateFormProp = {
  progressDirection: number;
  formData: object;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  currentTitle: string;
  firstInputElement: RefObject<HTMLInputElement>;
  CurrentForm: React.ComponentType<any>;
  disabled: boolean;
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
