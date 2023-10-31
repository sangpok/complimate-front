import { StepProp } from '@/Hooks/useMultiStepForm';
import * as PageLayout from '@Layouts/PageLayout';
import { ActionFunction, redirect, useSubmit } from 'react-router-dom';
import { LoginForm } from './LoginPage.form';

const initialFormData = {
  email: '',
  password: '',
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');

  alert(new URLSearchParams(formData).toString());

  return redirect('/test');
};

const LoginPage = () => {
  const submit = useSubmit();

  const multiFormList: StepProp[] = [
    {
      title: '이메일 입력',
      Component: LoginForm,
    },
  ];

  const handleSubmit = (formData: object) => {
    submit(formData, { method: 'post' });
  };

  return (
    <PageLayout.Root stepList={multiFormList} onSubmit={handleSubmit} fieldData={initialFormData}>
      <PageLayout.Header submitText="로그인" />
      <PageLayout.Content />
    </PageLayout.Root>
  );
};

export default LoginPage;
