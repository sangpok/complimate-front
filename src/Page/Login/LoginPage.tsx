/** React */
import { useState } from 'react';
import { redirect, useNavigate, useNavigation, useSubmit } from 'react-router-dom';

/** Style & Component */
import * as Header from '@Components/PageHeader';
import * as Layout from '@Layouts/DefaultLayout';
import * as Form from '@radix-ui/react-form';
import * as S from './LoginPage.styled';

/** Form */
import { LoginForm } from './LoginPage.form';

/** Type */
import type { ChangeEvent, FormEvent } from 'react';
import type { ActionFunction } from 'react-router-dom';

/** Constant for formdata */
const initialFormData = {
  email: '',
  password: '',
};

export const action: ActionFunction = async ({ request }) => {
  // const formData = await request.formData();

  // const email = formData.get('email');
  // const password = formData.get('password');

  // alert(new URLSearchParams(formData).toString());

  return await new Promise((resolve) => setTimeout(() => resolve(redirect('/tutorial')), 1500));
};

const LoginPage = () => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [formData, setFormData] = useState(initialFormData);

  const isSubmitting = navigation.state === 'submitting';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return submit(formData, { method: 'post' });
  };

  const handlePrevClick = () => {
    return navigate('/');
  };

  const updateFields = (newValue: object) => {
    setFormData((prev) => ({ ...prev, ...newValue }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateFields({ [event.target.id]: event.target.value });
  };

  return (
    <Form.Root onSubmit={handleSubmit}>
      <Layout.Full>
        <Layout.Root>
          <Layout.Head>
            <Header.Root>
              <Header.Prev disabled={isSubmitting} onClick={handlePrevClick} />
              <Header.Title>로그인하기</Header.Title>
              <Form.Submit asChild>
                <Header.Next disabled={isSubmitting}>
                  {isSubmitting ? '로그인 중...' : '로그인'}
                </Header.Next>
              </Form.Submit>
            </Header.Root>
          </Layout.Head>

          <Layout.Body>
            <S.LoginBody>
              <LoginForm disabled={isSubmitting} {...formData} onChange={handleChange} />
            </S.LoginBody>
          </Layout.Body>

          {/* <Layout.Foot>Foot</Layout.Foot> */}
        </Layout.Root>
      </Layout.Full>
    </Form.Root>
  );
};

export default LoginPage;
