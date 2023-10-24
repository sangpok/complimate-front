import { styled } from '@/stitches.config';
import * as Form from '@radix-ui/react-form';
import type { ChangeEvent } from 'react';

type FormDataProps = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

const FormField = styled(Form.Field, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$default',
  padding: '0 $default',
});

const FormLabel = styled(Form.Label, {
  fontSize: '$header',
  fontWeight: '500',
});

const FormControl = styled(Form.Control, {
  all: 'unset',

  padding: '$default',
  border: '.0625rem solid $point',
  borderRadius: '$small',
  fontSize: '$input',
});

const FormMessage = styled(Form.Message, {
  color: '$red',
  fontSize: '$label-status',
  fontWeight: 500,
});

type EmailFormProps = {
  updateFields: (field: Partial<FormDataProps>) => void;
} & Partial<FormDataProps>;

export const EmailForm = ({ email, updateFields }: EmailFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFields({ email: e.target.value });
  };

  return (
    <FormField name="email">
      <FormLabel htmlFor="email">이메일</FormLabel>
      <FormControl id="email" type="email" value={email} onChange={handleChange} required />
      <FormMessage match="valueMissing">이메일을 입력해보시오</FormMessage>
      <FormMessage match="typeMismatch">이메일 형식을 확인해보쇼</FormMessage>
    </FormField>
  );
};

type PasswordFormProps = {
  updateFields: (field: Partial<FormDataProps>) => void;
} & Partial<FormDataProps>;

export const PasswordForm = ({ password, passwordConfirm, updateFields }: PasswordFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFields({ [e.target.id]: e.target.value });
  };

  return (
    <>
      <FormField name="password">
        <FormLabel htmlFor="password">비밀번호</FormLabel>
        <FormControl
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
          required
          enterKeyHint="next"
        />
        <FormMessage match="valueMissing">비밀번호를 입력해보셔요</FormMessage>
      </FormField>

      <FormField name="passwordConfirm">
        <FormLabel htmlFor="passwordConfirm">비밀번호 확인</FormLabel>
        <FormControl
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={handleChange}
          required
        />
        <FormMessage match="valueMissing">비밀번호 확인을 입력해요</FormMessage>
      </FormField>
    </>
  );
};

type NicknameFormProps = {
  updateFields: (field: Partial<FormDataProps>) => void;
} & Partial<FormDataProps>;

export const NicknameForm = ({ nickname, updateFields }: NicknameFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFields({ nickname: e.target.value });
  };

  return (
    <FormField name="nickname">
      <FormLabel htmlFor="nickname">닉네임</FormLabel>
      <FormControl type="text" id="nickname" value={nickname} onChange={handleChange} required />
      <FormMessage match="valueMissing">닉네임 입력해보쇼</FormMessage>
    </FormField>
  );
};
