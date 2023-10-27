import React, { useState } from 'react';

import type { FormEvent } from 'react';

const useMultiStepForm = (initialFormData, stepList) => {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressDirection, setProgressDirection] = useState(1);

  const prev = () => {
    setCurrentStepIndex((index) => (index <= 0 ? 0 : index - 1));
    setProgressDirection(-1);
  };

  const next = () => {
    setCurrentStepIndex((index) => (index >= stepList.length - 1 ? index : index + 1));
    setProgressDirection(1);
  };

  const updateFields = (fields: object) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  return {
    currentStepIndex,
    currentTitle: stepList[currentStepIndex].title,
    CurrentStepComponent: stepList[currentStepIndex].Component,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === stepList.length - 1,
    progressDirection,
    prev,
    next,

    formData,
    updateFields,
  };
};

const TestPage = () => {
  const initialFormData = {
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  };

  const stepList = [
    {
      title: 'Input Email',
      Component: EmailForm,
    },
    {
      title: 'Input Password',
      Component: PasswordForm,
    },
    {
      title: 'Input Nickname',
      Component: NicknameForm,
    },
  ];

  const {
    formData,
    currentTitle,
    currentStepIndex,
    CurrentStepComponent,
    updateFields,
    prev,
    next,
  } = useMultiStepForm(initialFormData, stepList);

  const handleChange = (e) => {
    updateFields({ [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentStepIndex === stepList.length - 1) {
      alert(new URLSearchParams(formData).toString());
      return null;
    }

    next();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <header>
          <button type="button" onClick={() => prev()}>
            prev
          </button>
          <span>{currentTitle}</span>
          <button type="submit">next</button>
        </header>

        <section>
          <CurrentStepComponent {...formData} onChange={handleChange} />
        </section>
      </form>
    </div>
  );
};

const EmailForm = ({ email, onChange }) => {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" value={email} onChange={onChange} />
    </div>
  );
};

const PasswordForm = ({ password, passwordConfirm, onChange }) => {
  return (
    <div>
      <label htmlFor="password">Password</label>
      <input id="password" value={password} onChange={onChange} />
      <label htmlFor="passwordConfirm">PasswordConfirm</label>
      <input id="passwordConfirm" value={passwordConfirm} onChange={onChange} />
    </div>
  );
};

const NicknameForm = ({ nickname, onChange }) => {
  return (
    <div>
      <label htmlFor="nickname">Nickname</label>
      <input id="nickname" value={nickname} onChange={onChange} />
    </div>
  );
};

export default TestPage;
