import { StepProp } from '@/Hooks/useMultiStepForm';
import * as PageLayout from '@Layouts/PageLayout';
import { useEffect } from 'react';
import { ActionFunction, Navigate, redirect, useNavigation, useSubmit } from 'react-router-dom';
import { EmailForm, NicknameForm, PasswordForm } from './RegisterPage.form';

type FormDataProps = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

const initialFormData: FormDataProps = {
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
};

export const action: ActionFunction = async ({ request }) => {
  // const formData: unknown = await request.formData();

  // const email = formData.get('email');
  // const password = formData.get('password');
  // const nickname = formData.get('nickname');

  // alert(new URLSearchParams(formData as Record<string, string>).toString());

  // return <Navigate to="/tutorial" replace />;
  return await new Promise((resolve) => setTimeout(() => resolve(redirect('/tutorial')), 1500));
};

const RegisterPage = () => {
  const submit = useSubmit();
  const navigation = useNavigation();

  const multiFormList: StepProp[] = [
    {
      title: '이메일 입력',
      Component: EmailForm,
    },
    {
      title: '비밀번호 입력',
      Component: PasswordForm,
    },
    {
      title: '닉네임 입력',
      Component: NicknameForm,
    },
  ];

  const handleSubmit = (formData: object) => {
    submit(formData as FormData, { method: 'post' });
  };

  return (
    <PageLayout.Root stepList={multiFormList} onSubmit={handleSubmit} fieldData={initialFormData}>
      <PageLayout.Header submitting={navigation.state === 'submitting'} />
      <PageLayout.Content />
    </PageLayout.Root>
  );
};

export default RegisterPage;
