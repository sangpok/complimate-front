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

import * as API from '@API/index';
import { useAuth } from '@Hooks/useAuth';

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();

//   const email = formData.get('email') as string;
//   const password = formData.get('password') as string;

//   API.login({ email, password }).then(() => {
//     redirect("/app/tutorial")
//   });

//   // alert(new URLSearchParams(formData).toString());

//   // return await new Promise((resolve) => setTimeout(() => resolve(redirect('/tutorial')), 1500));
// };

export const LoginPage = () => {
  const { signIn, updateAuth } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const loginData = Object.fromEntries(formData);

    setIsSubmitting(true);

    signIn(loginData, {
      onSuccess: () => {
        updateAuth(true);
        navigate('/app/tutorial', { replace: true });
      },
      onError: (error) => {
        setIsSubmitting(false);
        setError(error);
      },
    });
  };

  const handlePrevClick = () => {
    return navigate('/');
  };

  return (
    <Form.Root onSubmit={handleSubmit}>
      <fieldset disabled={isSubmitting}>
        <Layout.Full>
          <Layout.Root>
            <Layout.Head>
              <Header.Root>
                <Header.Prev disabled={isSubmitting} onClick={handlePrevClick} />
                <Header.Title>로그인하기</Header.Title>
                <Header.Next disabled={isSubmitting}>
                  {isSubmitting ? '로그인 중...' : '로그인'}
                </Header.Next>
              </Header.Root>
            </Layout.Head>

            <Layout.Body>
              <S.LoginBody>
                <LoginForm />
                {error && <p>{error.message}</p>}
              </S.LoginBody>
            </Layout.Body>

            {/* <Layout.Foot>Foot</Layout.Foot> */}
          </Layout.Root>
        </Layout.Full>
      </fieldset>
    </Form.Root>
  );
};
