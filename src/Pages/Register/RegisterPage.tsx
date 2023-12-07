import { FormEvent, useEffect, useState } from 'react';

/** Style & Component */
import * as Header from '@Components/PageHeader/PageHeader';
import * as Layout from '@Layouts/DefaultLayout';
import * as C from './RegisterPage.component';

import {
  RegisterContextProvider,
  useRegisterMutation,
  useRegisterState,
} from '@Contexts/RegisterContext';
import { useCheckEmail, useCheckNickname, useCheckPassword } from '@Hooks/index';

import { FormConfig } from '@Types/index';
import { ActionFunction, redirect, useNavigate, useSubmit } from 'react-router-dom';
import { EmailForm, NicknameForm, PasswordForm } from './RegisterPage.form';

import * as API from '@API/index';

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();

//   const email = formData.get('email') as string;
//   const password = formData.get('password') as string;
//   const nickname = formData.get('nickname') as string;

//   try {
//     await API.createAccount({ email, password, nickname });
//     redirect('/app/tutorial');
//   } catch (error) {
//     console.log(error);
//   }

//   // alert(new URLSearchParams(formData).toString());
// };

const FormView = () => {
  const navigate = useNavigate();
  const submit = useSubmit();

  const { fieldSubmit, resetFormControl, moveToPrevForm, moveToNextForm } = useRegisterMutation();
  const { formControl, animateState, formState } = useRegisterState();
  const { fieldState } = formState;
  const { isDisabledNext, currentFormIndex, formConfigs } = formControl;

  const { changeDirectionToNext, changeDirectionToPrev, setAnimatingStateToStart } =
    useRegisterMutation();
  const { isAnimating } = animateState;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { Component: CurrentForm, nextButtonText, formName } = formConfigs![currentFormIndex];

  const startToMove = (direction: string) => {
    setAnimatingStateToStart();
    resetFormControl();

    if (direction === 'next') {
      changeDirectionToNext();
      moveToNextForm();
    } else {
      changeDirectionToPrev();
      moveToPrevForm();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    setIsSubmitting(true);

    fieldSubmit(formData, {
      onSuccess() {
        const isLastForm = currentFormIndex === formConfigs!.length - 1;

        if (isLastForm) {
          // return submit({ ...fieldState }, { method: 'POST' });
          return navigate('/signup', { state: { fieldState } });
        }

        startToMove('next');
      },
      onSettled() {
        setIsSubmitting(false);
      },
    });
  };

  const handlePrevClick = () => {
    const isFirstForm = currentFormIndex === 0;

    if (isFirstForm) {
      return navigate('/', { replace: true });
    }

    startToMove('prev');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Layout.Head>
        <Header.Root>
          <Header.Prev disabled={isSubmitting || isAnimating} onClick={handlePrevClick} />
          <C.AnimateTitle title={formName}>
            <Header.Title>{formName}</Header.Title>
          </C.AnimateTitle>
          <Header.Next disabled={isSubmitting || isDisabledNext || isAnimating}>
            {nextButtonText}
          </Header.Next>
        </Header.Root>
      </Layout.Head>

      <Layout.Body>
        <fieldset disabled={isSubmitting || isAnimating}>
          <C.AnimateForm title={formName}>
            <CurrentForm />
          </C.AnimateForm>
        </fieldset>
      </Layout.Body>
    </form>
  );
};

const InitializeFormComponent = () => {
  const { checkEmail } = useCheckEmail();
  const { checkPassword } = useCheckPassword();
  const { checkNickname } = useCheckNickname();

  const initialFormConfigs: FormConfig[] = [
    {
      formId: 'email',
      formName: '이메일 입력',
      nextButtonText: '다음',
      Component: EmailForm,
      submitFn: checkEmail,
    },
    {
      formId: 'password',
      formName: '비밀번호 입력',
      nextButtonText: '다음',
      Component: PasswordForm,
      submitFn: checkPassword,
    },
    {
      formId: 'nickname',
      formName: '닉네임 입력',
      nextButtonText: '가입',
      Component: NicknameForm,
      submitFn: checkNickname,
    },
  ];

  const { initiailizeFormConfigs, initializeFormState } = useRegisterMutation();

  const { formControl } = useRegisterState();
  const { formConfigs } = formControl;

  useEffect(() => {
    if (!formConfigs) {
      initializeFormState({
        email: 'sangpok@complimate.com',
        password: 'sangpok',
        passwordConfirm: 'sangpok',
        nickname: '김 주핸',
      });
      initiailizeFormConfigs(initialFormConfigs);
    }
  }, []);

  return formConfigs && <FormView />;
};

export const RegisterPage = () => {
  return (
    <Layout.Root>
      <Layout.Full>
        <RegisterContextProvider>
          <InitializeFormComponent />
        </RegisterContextProvider>
      </Layout.Full>
    </Layout.Root>
  );
};
