import { ComponentType } from 'react';

export type CheckFieldResult = {
  [k: string]: boolean;
};

export type SubmitCallbacks = {
  onSuccess?: () => void;
  onFail?: (error: Error) => void;
  onSettled?: () => void;
};

export type FormConfig = {
  formId: string;
  formName: string;
  Component: ComponentType;
  submitFn: unknown;
  nextButtonText: string;
};

export type UserAuth = {
  email: string;
  password: string;
  nickname: string;
};
