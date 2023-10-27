import { StepProp } from '@/Hooks/useMultiStepForm';
import * as PageLayout from '@Layouts/PageLayout';
import { ActionFunction, useSubmit } from 'react-router-dom';
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
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');
  const nickname = formData.get('nickname');

  alert(new URLSearchParams(formData).toString());

  return null;
};

const RegisterPage = () => {
  const submit = useSubmit();

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
    submit(formData, { method: 'post' });
  };

  return (
    <PageLayout.Root stepList={multiFormList} onSubmit={handleSubmit} fieldData={initialFormData}>
      <PageLayout.Header />
      <PageLayout.Content />
    </PageLayout.Root>
  );
};

export default RegisterPage;
