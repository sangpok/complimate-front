/** React */
import { useRef } from 'react';
import { redirect, useNavigate, useNavigation, useSubmit } from 'react-router-dom';

/** Style & Component */
import * as Layout from '@Layouts/DefaultLayout';
import * as Header from '@Components/PageHeader';
import * as Form from '@radix-ui/react-form';
import * as C from './RegisterPage.component';
import * as S from './RegisterPage.styled';

/** Hook */
import useMultiStepForm from '@Hooks/useMultiStepForm';

/** Form */
import { EmailForm, NicknameForm, PasswordForm } from './RegisterPage.form';

/** Type */
import type { StepProp } from '@Hooks/useMultiStepForm';
import type { ActionFunction } from 'react-router-dom';
import type { FormDataProps } from './RegisterPage.types';
import type { ChangeEvent, FormEvent } from 'react';

/** Constants for multi-step */
const initialFormData: FormDataProps = {
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
};

const multiStepList: StepProp[] = [
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

export const action: ActionFunction = async ({ request }) => {
  // const formData: unknown = await request.formData();

  // const email = formData.get('email');
  // const password = formData.get('password');
  // const nickname = formData.get('nickname');

  // alert(new URLSearchParams(formData as Record<string, string>).toString());

  // return <Navigate to="/tutorial" replace />;
  return await new Promise((resolve) => setTimeout(() => resolve(redirect('/tutorial')), 1500));
};

/**
 * HTNL Form 특성을 이용한 Multi-step Form이다.
 *
 * Form 태그 안에 있는 버튼은 기본적으로 Submit 버튼이 된다.
 * ---> 방지하려면 type을 button으로 주어야 한다.
 *
 * 따라서, 버튼 그 자체는 submit으로 놔두면 click 이벤트를 따로 지정하지 않아도 Form Event가 발생한다.
 * 이 특성을 이용해서, Form의 onSubmit Event를 Handling 한다.
 *
 * onSubmit Event에서 기본 이벤트를 방지한다.
 * ---> 방지하지 않으면 redirect가 발생한다. 즉, Refresh 발생
 *
 * 그 다음 마지막 Step인지 아닌지에 따라서 분기한다.
 * ---> 마지막 스탭이면: 폼 데이터 제출
 * ---> 마지막 스탭이 아니면: 다음 Step Index 증가
 *
 * 이때 각 폼마다 유효성 검사를 진행해야 할 텐데, 이 역시 기본 Form 특성을 이용한다.
 * 예를 들어 input에 required 속성이 있으면 자동으로 유효성 검사가 진행된다.
 * 만약 통과하지 못하면 :invalid pesudo-class가 활성화된다.
 *
 * 또, 해당 객체에 대한 invalid type에 대해 pesudo-class가 활성화된다. (e.g. :out-of-range)
 * pesudo-class가 아닌 event의 valid 객체에서도 확인할 수 있다.
 *
 * radix ui는 이를 이용해서 Form Message를 구현해주고 있다.
 *
 * 각 Step마다 유효성 검사를 통과하면 전체 Form Data를 저장하는 State에 저장하고,
 * 각 Step마다 뿌려준다. 이러면 뒤로 가도 입력했던 데이터가 살아있게 되는 것.
 */

const RegisterPage = () => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const firstInputElement = useRef<HTMLInputElement>(null);

  const isSubmitting = navigation.state === 'submitting';

  const {
    currentTitle,
    CurrentForm,
    isFirstStep,
    isLastStep,
    progressDirection,
    prevForm,
    nextForm,

    formData,
    updateFields,
  } = useMultiStepForm(multiStepList, initialFormData);

  const handlePrevClick = () => {
    if (isFirstStep) {
      return navigate('/');
    }

    prevForm();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLastStep) {
      return submit(formData as FormData, { method: 'post' });
    }

    nextForm();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateFields({ [event.target.id]: event.target.value });
    // console.log({ [event.target.id]: event.target.value });
  };

  return (
    <Form.Root onSubmit={handleSubmit}>
      <Layout.Full>
        <Layout.Root>
          <Layout.Head>
            <Header.Root>
              <Header.Prev disabled={isSubmitting} onClick={handlePrevClick} />
              <C.AnimateTitle progressDirection={progressDirection} title={currentTitle} />
              <Form.Submit asChild>
                <Header.Next disabled={isSubmitting}>
                  {isSubmitting ? '가입중...' : isLastStep ? '가입' : '다음'}
                </Header.Next>
              </Form.Submit>
            </Header.Root>
          </Layout.Head>

          <Layout.Body>
            <C.AnimateForm
              progressDirection={progressDirection}
              formData={formData}
              currentTitle={currentTitle}
              firstInputElement={firstInputElement}
              CurrentForm={CurrentForm}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </Layout.Body>

          <Layout.Foot>Foot</Layout.Foot>
        </Layout.Root>
      </Layout.Full>
    </Form.Root>
  );
};

export default RegisterPage;
