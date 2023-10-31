import { styled } from '@/stitches.config';
import * as Form from '@radix-ui/react-form';
import { forwardRef, useEffect, type ChangeEvent } from 'react';

import * as Input from '@Components/Atomic/Input';
import * as Icon from '@Icons/index';

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
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & Partial<FormDataProps>;

export const EmailForm = forwardRef(({ email, onChange }: EmailFormProps, ref) => {
  // const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current.focus();
  }, [ref.current]);

  return (
    <FormField name="email">
      <FormLabel htmlFor="email">이메일</FormLabel>
      <Form.Control asChild>
        <Input.Content
          icon={<Icon.Email />}
          id="email"
          type="email"
          value={email}
          onChange={onChange}
          placeholder="email@complimate.com"
          data-role="firstinput"
          required
          ref={ref}
          enterKeyHint="next"
        />
      </Form.Control>
      <FormMessage match="valueMissing" name="email">
        이메일을 입력해보시오
      </FormMessage>
      <FormMessage match="typeMismatch">이메일 형식을 확인해보쇼</FormMessage>
    </FormField>
  );
});

type PasswordFormProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & Partial<FormDataProps>;

export const PasswordForm = forwardRef(
  ({ password, passwordConfirm, onChange }: PasswordFormProps, ref) => {
    return (
      <>
        <FormField name="password">
          <FormLabel htmlFor="password">비밀번호</FormLabel>

          <Form.Control asChild>
            <Input.Content
              icon={<Icon.Password />}
              id="password"
              type="password"
              value={password}
              onChange={onChange}
              placeholder="비밀번호"
              data-role="firstinput"
              enterKeyHint="next"
              required
              ref={ref}
              // autoFocus
            />
          </Form.Control>
          <FormMessage match="valueMissing">비밀번호를 입력해보셔요</FormMessage>
        </FormField>

        <FormField name="passwordConfirm">
          <FormLabel htmlFor="passwordConfirm">비밀번호 확인</FormLabel>

          <Form.Control asChild>
            <Input.Content
              icon={<Icon.Password />}
              id="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={onChange}
              placeholder="비밀번호 확인"
              enterKeyHint="next"
              required
            />
          </Form.Control>
          <FormMessage match="valueMissing">비밀번호 확인을 입력해요</FormMessage>
        </FormField>
      </>
    );
  }
);

type NicknameFormProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & Partial<FormDataProps>;

export const NicknameForm = forwardRef(({ nickname, onChange }: NicknameFormProps, ref) => {
  return (
    <FormField name="nickname">
      <FormLabel htmlFor="nickname">닉네임</FormLabel>
      <Form.Control asChild>
        <Input.Content
          icon={<></>}
          id="nickname"
          type="text"
          value={nickname}
          onChange={onChange}
          placeholder="닉네임"
          data-role="firstinput"
          required
          ref={ref}
        />
      </Form.Control>
      <FormMessage match="valueMissing">닉네임 입력해보쇼</FormMessage>
    </FormField>
  );
});
