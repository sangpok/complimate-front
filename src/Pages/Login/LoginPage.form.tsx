import { FormEvent, forwardRef } from 'react';

import * as Input from '@Components/Atomic/Input';
import * as Icon from '@Icons/index';
import * as Form from '@radix-ui/react-form';
import * as S from './LoginPage.styled';

import { LoginFormProp } from './LoginPage.types';

export const LoginForm = () => {
  const handleEmailInvalid = (event: FormEvent<HTMLInputElement>) => {
    const email = event.target as HTMLInputElement;
    const emailError = document.querySelector<HTMLParagraphElement>('p#emailError')!;

    emailError.hidden = false;

    if (email.validity.valueMissing) {
      emailError.textContent = '이메일을 입력해주세요.';
    } else if (!email.validity.valid) {
      emailError.textContent = email.validationMessage;
    }
  };

  const handleEmailInput = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const email = event.target as HTMLInputElement;
    const emailError = document.querySelector<HTMLParagraphElement>('p#emailError')!;

    emailError.hidden = true;
    emailError.textContent = '';
  };

  const handlePasswordInvalid = (event: FormEvent<HTMLInputElement>) => {
    const password = event.target as HTMLInputElement;
    const passwordError = document.querySelector<HTMLParagraphElement>('p#passwordError')!;

    passwordError.hidden = false;

    if (password.validity.valueMissing) {
      passwordError.textContent = '암호를 입력해주세요.';
    } else if (!password.validity.rangeUnderflow) {
      passwordError.textContent = `암호는 ${password.minLength}글자 이상이어야 해요. (현재 ${password.value.length}글자)`;
    } else if (!password.validity.rangeOverflow) {
      passwordError.textContent = `암호는 ${password.maxLength}글자 이하여야 해요. (현재 ${password.value.length}글자)`;
    } else if (!password.validity.valid) {
      passwordError.textContent = password.validationMessage;
    }
  };

  const handlePasswordInput = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const password = event.target as HTMLInputElement;
    const passwordError = document.querySelector<HTMLParagraphElement>('p#passwordError')!;

    passwordError.hidden = true;
    passwordError.textContent = '';
  };

  return (
    <>
      <Input.Root>
        <Input.Content
          icon={<Icon.Email />}
          id="email"
          name="email"
          type="email"
          defaultValue="sangpok@complimate.com"
          placeholder="email@complimate.com"
          required
          enterKeyHint="next"
          autoComplete="email"
          data-role="firstinput"
          autoFocus
          onInput={handleEmailInput}
          onInvalid={handleEmailInvalid}
          // onChange={onChange}
        />

        <Input.Content
          icon={<Icon.Password />}
          id="password"
          name="password"
          type="password"
          defaultValue="sangpok"
          placeholder="비밀번호"
          required
          enterKeyHint="enter"
          autoComplete="current-password"
          onInput={handlePasswordInput}
          onInvalid={handlePasswordInvalid}
          minLength={4}
          maxLength={20}
          // onChange={onChange}
        />
      </Input.Root>

      <p id="emailError" hidden></p>
      <p id="passwordError" hidden></p>
    </>
  );
};

// export const LoginForm = forwardRef(
//   ({ disabled, email, password, onChange }: LoginFormProp, ref) => {
//     return (
//       <>
//         <Input.Root>
//           <S.FormField name="email" asChild>
//             <Form.Control asChild>
//               <Input.Content
//                 icon={<Icon.Email />}
//                 id="email"
//                 type="email"
//                 placeholder="email@complimate.com"
//                 required
//                 enterKeyHint="next"
//                 autoComplete="email"
//                 data-role="firstinput"
//                 autoFocus
//                 value={email}
//                 onChange={onChange}
//                 ref={ref}
//                 disabled={disabled}
//               />
//             </Form.Control>
//           </S.FormField>

//           <S.FormField name="password" asChild>
//             <Form.Control asChild>
//               <Input.Content
//                 icon={<Icon.Password />}
//                 id="password"
//                 type="password"
//                 placeholder="비밀번호"
//                 required
//                 enterKeyHint="enter"
//                 autoComplete="current-password"
//                 value={password}
//                 onChange={onChange}
//                 disabled={disabled}
//               />
//             </Form.Control>
//           </S.FormField>
//         </Input.Root>

//         <S.FormField name="">
//           <S.FormMessage match="valueMissing" name="email">
//             이메일 비었다 비었어
//           </S.FormMessage>
//           <S.FormMessage match="typeMismatch" name="email">
//             이메일 형식이 그게 맞냐?
//           </S.FormMessage>
//           <S.FormMessage match="valueMissing" name="password">
//             비밀번호 비었다 비었어
//           </S.FormMessage>
//         </S.FormField>
//       </>
//     );
//   }
// );
