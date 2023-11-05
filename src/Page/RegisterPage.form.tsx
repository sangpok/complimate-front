import * as Input from '@Components/Atomic/Input';
import * as Icon from '@Icons/index';
import * as Form from '@radix-ui/react-form';
import * as S from './RegisterPage.styled';

import { forwardRef, useEffect } from 'react';
import { EmailFormProps, NicknameFormProps, PasswordFormProps } from './RegisterPage.types';

export const EmailForm = forwardRef(({ email, disabled, onChange }: EmailFormProps, ref) => {
  /**
   * 원래 Animation이 끝나기 전에 Focus가 먼저 가면 포커스가 된 입력상자를 우선적으로 보여주기 때문에
   * layout이 망가지면서 원하는 화면 전환이 안 나오는데
   * 이건 첫 번째 step이고 + 이전을 눌러도 왼쪽에서 나오기 때문에 상관 없는 듯...?
   */
  useEffect(() => {
    if (ref.current !== null) {
      ref.current.focus();
    }
  }, [ref.current]);

  return (
    <S.FormField name="email">
      <S.FormLabel htmlFor="email">이메일</S.FormLabel>
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
          // autoFocus
          disabled={disabled}
        />
      </Form.Control>
      <S.FormMessage match="valueMissing" name="email">
        이메일을 입력해보시오
      </S.FormMessage>
      <S.FormMessage match="typeMismatch">이메일 형식을 확인해보쇼</S.FormMessage>
    </S.FormField>
  );
});

export const PasswordForm = forwardRef(
  ({ password, passwordConfirm, onChange, disabled }: PasswordFormProps, ref) => {
    return (
      <>
        <S.FormField name="password">
          <S.FormLabel htmlFor="password">비밀번호</S.FormLabel>

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
              disabled={disabled}
            />
          </Form.Control>
          <S.FormMessage match="valueMissing">비밀번호를 입력해보셔요</S.FormMessage>
        </S.FormField>

        <S.FormField name="passwordConfirm">
          <S.FormLabel htmlFor="passwordConfirm">비밀번호 확인</S.FormLabel>

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
              disabled={disabled}
            />
          </Form.Control>
          <S.FormMessage match="valueMissing">비밀번호 확인을 입력해요</S.FormMessage>
        </S.FormField>
      </>
    );
  }
);

export const NicknameForm = forwardRef(
  ({ nickname, disabled, onChange }: NicknameFormProps, ref) => {
    return (
      <S.FormField name="nickname">
        <S.FormLabel htmlFor="nickname">닉네임</S.FormLabel>
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
            disabled={disabled}
          />
        </Form.Control>
        <S.FormMessage match="valueMissing">닉네임 입력해보쇼</S.FormMessage>
      </S.FormField>
    );
  }
);
