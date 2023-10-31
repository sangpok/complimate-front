import { styled } from '@/stitches.config';
import * as Form from '@radix-ui/react-form';
import { ChangeEvent, forwardRef } from 'react';
import * as Icon from '@Icons/index';

import * as Input from '@Components/Atomic/Input';

const FormField = styled(Form.Field, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$default',
  padding: '0 $default',
});

const FormMessage = styled(Form.Message, {
  color: '$red',
  fontSize: '$label-status',
  fontWeight: 500,
});

type LoginFormProp = {
  email: string;
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const LoginForm = forwardRef(({ email, password, onChange }: LoginFormProp, ref) => {
  return (
    <>
      <Input.Root>
        <FormField name="email" asChild>
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
            />
          </Form.Control>
        </FormField>

        <FormField name="password" asChild>
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
            />
          </Form.Control>
        </FormField>
      </Input.Root>

      <FormField name="">
        <FormMessage match="valueMissing" name="email">
          이메일 비었다 비었어
        </FormMessage>
        <FormMessage match="typeMismatch" name="email">
          이메일 형식이 그게 맞냐?
        </FormMessage>
        <FormMessage match="valueMissing" name="password">
          비밀번호 비었다 비었어
        </FormMessage>
      </FormField>
    </>
  );
});
