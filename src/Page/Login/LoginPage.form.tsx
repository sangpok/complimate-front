import { forwardRef } from 'react';

import * as Input from '@Components/Atomic/Input';
import * as Icon from '@Icons/index';
import * as Form from '@radix-ui/react-form';
import * as S from './LoginPage.styled';

import { LoginFormProp } from './LoginPage.types';

export const LoginForm = forwardRef(
  ({ disabled, email, password, onChange }: LoginFormProp, ref) => {
    return (
      <>
        <Input.Root>
          <S.FormField name="email" asChild>
            <Form.Control asChild>
              <Input.Content
                icon={<Icon.Email />}
                id="email"
                type="email"
                placeholder="email@complimate.com"
                required
                enterKeyHint="next"
                autoComplete="email"
                data-role="firstinput"
                autoFocus
                value={email}
                onChange={onChange}
                ref={ref}
                disabled={disabled}
              />
            </Form.Control>
          </S.FormField>

          <S.FormField name="password" asChild>
            <Form.Control asChild>
              <Input.Content
                icon={<Icon.Password />}
                id="password"
                type="password"
                placeholder="비밀번호"
                required
                enterKeyHint="enter"
                autoComplete="current-password"
                value={password}
                onChange={onChange}
                disabled={disabled}
              />
            </Form.Control>
          </S.FormField>
        </Input.Root>

        <S.FormField name="">
          <S.FormMessage match="valueMissing" name="email">
            이메일 비었다 비었어
          </S.FormMessage>
          <S.FormMessage match="typeMismatch" name="email">
            이메일 형식이 그게 맞냐?
          </S.FormMessage>
          <S.FormMessage match="valueMissing" name="password">
            비밀번호 비었다 비었어
          </S.FormMessage>
        </S.FormField>
      </>
    );
  }
);
