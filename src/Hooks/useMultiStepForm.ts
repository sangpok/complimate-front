import { ComponentType, useState } from 'react';

export type StepProp = {
  title: string;
  Component: ComponentType<any>;
};

export type MultiStepFormType = {
  currentStepIndex: number;
  currentTitle: string;
  isFirstStep: boolean;
  isLastStep: boolean;
  progressDirection: number;
  CurrentStepComponent: ComponentType<any>;
  prev: () => void;
  next: () => void;
  formData: object;
  updateFields: (field: object) => void;
};

const useMultiStepForm = (steps: StepProp[], initialFormData: object): MultiStepFormType => {
  const [formData, setFormData] = useState(initialFormData);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressDirection, setProgressDirection] = useState(1);

  const updateFields = (field: object) => {
    setFormData((prev) => ({ ...prev, ...field }));
  };

  const prev = () => {
    setCurrentStepIndex((index) => (index <= 0 ? 0 : index - 1));
    setProgressDirection(-1);
  };

  const next = () => {
    setCurrentStepIndex((index) => (index >= steps.length - 1 ? index : index + 1));
    setProgressDirection(1);
  };

  return {
    currentStepIndex,
    currentTitle: steps[currentStepIndex].title,
    CurrentStepComponent: steps[currentStepIndex].Component,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    progressDirection,
    prev,
    next,

    formData,
    updateFields,
  };
};

export default useMultiStepForm;
