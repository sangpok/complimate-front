import { ChangeEvent } from 'react';

export type LoginFormProp = {
  email: string;
  password: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
