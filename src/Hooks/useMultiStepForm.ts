import { ComponentType, useState } from 'react';

export type StepProp = {
  title: string;
  Component: ComponentType<any>;
};

export type MultiStepFormType = {
  currentFormIndex: number;
  currentTitle: string;
  isFirstStep: boolean;
  isLastStep: boolean;
  progressDirection: number;
  CurrentForm: ComponentType<any>;
  prevForm: () => void;
  nextForm: () => void;
  formData: object;
  updateFields: (field: object) => void;
};

const useMultiStepForm = (steps: StepProp[], initialFormData: object): MultiStepFormType => {
  const [formData, setFormData] = useState(initialFormData);

  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [progressDirection, setProgressDirection] = useState(1);

  const updateFields = (field: object) => {
    setFormData((prev) => ({ ...prev, ...field }));
  };

  const prevForm = () => {
    setCurrentFormIndex((index) => (index <= 0 ? 0 : index - 1));
    setProgressDirection(-1);
  };

  const nextForm = () => {
    setCurrentFormIndex((index) => (index >= steps.length - 1 ? index : index + 1));
    setProgressDirection(1);
  };

  return {
    currentFormIndex,
    currentTitle: steps[currentFormIndex].title,
    CurrentForm: steps[currentFormIndex].Component,
    isFirstStep: currentFormIndex === 0,
    isLastStep: currentFormIndex === steps.length - 1,
    progressDirection,
    prevForm,
    nextForm,

    formData,
    updateFields,
  };
};

export default useMultiStepForm;
