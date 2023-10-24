/** React 관련 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';

/** Style */
import { PageContent } from './RegisterPage.styled';

/** Animation */
import { AnimatePresence } from 'framer-motion';
import PageTransition from '@Components/PageTransition';

/** Component */
import FixedHeader from '@Components/FixedHeader';

/** Hook */
import useMultiStepForm from '@/Hooks/useMultiStepForm';

/** Form */
import { EmailForm, NicknameForm, PasswordForm } from './RegisterPage.Form';

type FormDataProps = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

const initialFormData = {
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
};

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);

  const updateFields = (fields: Partial<FormDataProps>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const multiFormList = [
    {
      title: '이메일 입력',
      element: <EmailForm {...formData} updateFields={updateFields} />,
    },

    {
      title: '비밀번호 입력',
      element: <PasswordForm {...formData} updateFields={updateFields} />,
    },
    {
      title: '닉네임 입력',
      element: <NicknameForm {...formData} updateFields={updateFields} />,
    },
  ];

  const {
    currentTitle,
    currentStep,
    currentStepIndex,
    prev: prevForm,
    next: nextForm,
    isFirstStep,
    isLastStep,
    progressDirection,
  } = useMultiStepForm(multiFormList);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLastStep) {
      // TODO: Request form
      return alert(Object.entries(formData).toString());
    }

    nextForm();
  };

  const handlePrevClick = () => {
    if (isFirstStep) {
      return navigate('..');
    }

    prevForm();
  };

  return (
    <PageTransition>
      <FixedHeader.Root onSubmit={handleSubmit}>
        <FixedHeader
          onPrevClick={handlePrevClick}
          progressDirection={progressDirection}
          title={currentTitle}
          nextContent={isLastStep ? '완료' : '다음'}
        />

        <AnimatePresence custom={progressDirection} initial={false}>
          <PageContent
            key={currentStepIndex}
            custom={progressDirection}
            variants={{
              initial: (moveDirection) => ({ x: `${100 * moveDirection}%` }),
              normal: { x: 0 },
              exit: (moveDirection) => ({ x: `${-100 * moveDirection}%` }),
            }}
            initial="initial"
            animate="normal"
            exit="exit"
          >
            {currentStep}
          </PageContent>
        </AnimatePresence>
      </FixedHeader.Root>
    </PageTransition>
  );
};

export default RegisterPage;
