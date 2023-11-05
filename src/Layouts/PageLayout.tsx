import useMultiStepForm, { MultiStepFormType, StepProp } from '@/Hooks/useMultiStepForm';
import { styled } from '@/stitches.config';
import * as PageHeader from '@Components/PageHeader';
import PageTransition from '@Components/PageTransition';
import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, createContext, useContext, useRef } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const PageContent = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$double',
  position: 'absolute',
  padding: '0 $default',
  width: '100%',
  marginTop: '$content',
});

const Fieldset = styled('fieldset', {
  all: 'unset',

  '&:disabled': {
    color: '$depth1',
  },
});

const PageContext = createContext<MultiStepFormType>({} as MultiStepFormType);

type PageRootProp = {
  children: ReactNode;
  onSubmit: (formData: object) => void;
  fieldData: object;
  stepList: StepProp[];
};

const Root = ({ children, onSubmit, stepList, fieldData }: PageRootProp) => {
  const multiStepForm = useMultiStepForm(stepList, fieldData);
  const { formData, isLastStep, next: nextForm } = multiStepForm;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLastStep) {
      return onSubmit(formData);
    }

    nextForm();
  };

  return (
    // <PageTransition>
    <PageHeader.Root onSubmit={handleSubmit}>
      <PageContext.Provider value={multiStepForm}>{children}</PageContext.Provider>
    </PageHeader.Root>
    // </PageTransition>
  );
};

type HeaderProp = {
  submitText?: string;
  submitting?: boolean;
};

const Header = ({ submitText = '완료', submitting = false }: HeaderProp) => {
  const navigate = useNavigate();

  const multiStepForm = useContext(PageContext);
  const {
    isFirstStep,
    currentTitle,
    progressDirection,
    isLastStep,
    prev: prevForm,
  } = multiStepForm;

  const handlePrevClick = () => {
    if (isFirstStep) {
      return navigate('..');
    }

    prevForm();
  };

  return (
    <PageHeader.Content
      onPrevClick={handlePrevClick}
      progressDirection={progressDirection}
      title={currentTitle}
      nextContent={isLastStep ? submitText : '다음'}
      submitting={submitting}
    />
  );
};

const Content = () => {
  // const [isPresent, safeToRemove] = usePresence();

  const multiStepForm = useContext(PageContext);
  const firstInputElement = useRef<HTMLInputElement>(null);

  const { currentStepIndex, progressDirection, CurrentStepComponent, updateFields, formData } =
    multiStepForm;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateFields({ [event.target.id]: event.target.value });
    console.log({ [event.target.id]: event.target.value });
  };

  return (
    <AnimatePresence
      custom={progressDirection}
      initial={false}
      onExitComplete={() => {
        if (firstInputElement.current) {
          firstInputElement.current.focus();
        }
      }}
    >
      <PageContent
        key={currentStepIndex}
        custom={progressDirection}
        variants={{
          initial: (progressDirection: number) => ({ x: `${100 * progressDirection}%` }),
          normal: { x: 0 },
          exit: (progressDirection: number) => ({
            x: `${-100 * progressDirection}%`,
          }),
        }}
        initial="initial"
        animate="normal"
        exit="exit"
      >
        <Fieldset disabled={false}>
          <CurrentStepComponent {...formData} onChange={handleChange} ref={firstInputElement} />
        </Fieldset>
      </PageContent>
    </AnimatePresence>
  );
};

export { Content, Header, Root };
