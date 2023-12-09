import * as Input from '@Components/Atomic/Input';
import * as Icon from '@Icons/index';
import * as Form from '@radix-ui/react-form';
import * as S from './RegisterPage.styled';

import { useRegisterMutation, useRegisterState } from '@Contexts/RegisterContext';
import { ChangeEvent, FormEvent, useEffect, useRef } from 'react';

export const EmailForm = () => {
  const { formState } = useRegisterState();
  const { disableNext, updateField, clearFieldError, updateError } = useRegisterMutation();

  const { fieldState, errorState } = formState;
  const { email } = fieldState;
  const { email: emailError } = errorState;

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNextDisabled();
  }, []);

  const setNextDisabled = () => {
    const email = emailInputRef.current!.value;

    // TODO: Email Field 검증
    const isEmpty = email === '';
    // const isFormatted = false
    // const isDisabled = !isNotEmpty || !isFormatted;
    const isDisabled = isEmpty;

    disableNext(isDisabled);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;

    setNextDisabled();
    updateField({ email });

    if (emailError) {
      clearFieldError('email');
    }
  };

  const handleInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const email = event.target as HTMLInputElement;
    updateError({ email: email.validationMessage });
  };

  return (
    <>
      <S.FormField>
        <S.FormLabel htmlFor="email">이메일</S.FormLabel>
        <Input.Content
          icon={<Icon.Email />}
          id="email"
          name="email"
          type="email"
          defaultValue={email}
          onChange={handleChange}
          onInvalid={handleInvalid}
          placeholder="email@complimate.com"
          data-role="firstinput"
          required
          ref={emailInputRef}
          enterKeyHint="next"
        />
        {emailError && (
          <p id="error" style={{ color: 'red' }}>
            {emailError}
          </p>
        )}
      </S.FormField>
    </>
  );
};

export const PasswordForm = () => {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);

  const { formState } = useRegisterState();
  const { disableNext, updateField, clearFieldError } = useRegisterMutation();

  const { fieldState, errorState } = formState;
  const { password, passwordConfirm } = fieldState;
  const { pasword: passwordError, passwordConfirm: passwordConfirmError } = errorState;

  useEffect(() => {
    setNextDisabled();
  }, []);

  const setNextDisabled = () => {
    const pw = passwordInputRef.current!.value;
    const pwConfirm = passwordConfirmInputRef.current!.value;

    const isNotEmpty = pw !== '' && pwConfirm !== '';
    const isSamePassword = pw === pwConfirm;
    const isDisabled = !isNotEmpty || !isSamePassword;

    disableNext(isDisabled);
  };

  const handleChangePW = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;

    setNextDisabled();
    updateField({ password });

    if (passwordError) {
      clearFieldError('password');
    }
  };

  const handleChangePWConfirm = (event: ChangeEvent<HTMLInputElement>) => {
    const passwordConfirm = event.target.value;

    setNextDisabled();
    updateField({ passwordConfirm });

    if (passwordConfirmError) {
      clearFieldError('passwordConfirm');
    }
  };

  return (
    <>
      <S.FormField>
        <S.FormLabel htmlFor="password">비밀번호</S.FormLabel>
        <Input.Content
          icon={<Icon.Password />}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleChangePW}
          placeholder="비밀번호"
          data-role="firstinput"
          enterKeyHint="next"
          required
          ref={passwordInputRef}
        />

        {passwordError && <S.FormMessage>{passwordError}</S.FormMessage>}
      </S.FormField>

      <S.FormField>
        <S.FormLabel htmlFor="passwordConfirm">비밀번호 확인</S.FormLabel>

        <Input.Content
          icon={<Icon.Password />}
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={handleChangePWConfirm}
          placeholder="비밀번호 확인"
          enterKeyHint="next"
          required
          ref={passwordConfirmInputRef}
        />
        {passwordConfirmError && <S.FormMessage>{passwordConfirmError}</S.FormMessage>}
      </S.FormField>
      {/* <label htmlFor="password">암호</label>
      <input
        id="password"
        name="password"
        defaultValue={password}
        placeholder="암호를 입력하세요"
        onChange={handleChangePW}
        ref={passwordInputRef}
      />
      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

      <label htmlFor="passwordConfirm">암호 확인</label>
      <input
        id="passwordConfirm"
        name="passwordConfirm"
        defaultValue={passwordConfirm}
        placeholder="암호를 한 번 더 입력하세요"
        onChange={handleChangePWConfirm}
        ref={passwordConfirmInputRef}
      />
      {passwordConfirmError && <p style={{ color: 'red' }}>{passwordConfirmError}</p>} */}
    </>
  );
};

export const NicknameForm = () => {
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const { formState } = useRegisterState();
  const { disableNext, updateField, clearFieldError } = useRegisterMutation();

  const { fieldState, errorState } = formState;

  const { nickname } = fieldState;
  const { nickname: nicknameError } = errorState;

  useEffect(() => {
    setNextDisabled();
  }, []);

  const setNextDisabled = () => {
    const nickname = nicknameInputRef.current!.value;

    // TODO: Nickname Field 검증
    const isNotEmpty = nickname !== '';
    // const isFormatted = false
    // const isDisabled = !isNotEmpty || !isFormatted;
    const isDisabled = !isNotEmpty;

    disableNext(isDisabled);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nickname = event.target.value;

    setNextDisabled();
    updateField({ nickname });

    if (nicknameError) {
      clearFieldError('nickname');
    }
  };

  return (
    <>
      <S.FormField>
        <S.FormLabel htmlFor="nickname">닉네임</S.FormLabel>
        <Input.Content
          icon={<></>}
          id="nickname"
          name="nickname"
          type="text"
          value={nickname}
          onChange={handleChange}
          placeholder="닉네임"
          data-role="firstinput"
          required
          ref={nicknameInputRef}
        />
        {nicknameError && <S.FormMessage>{nicknameError}</S.FormMessage>}
      </S.FormField>
      {/* <label htmlFor="nickname">Nickname</label>
      <input
        id="nickname"
        name="nickname"
        defaultValue={nickname}
        placeholder="닉네임을 적어보세요"
        onChange={handleChange}
        ref={nicknameInputRef}
      />
      {nicknameError && <p style={{ color: 'red' }}>{nicknameError}</p>} */}
    </>
  );
};
