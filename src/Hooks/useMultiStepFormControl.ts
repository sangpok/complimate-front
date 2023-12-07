import { FormConfig, SubmitCallbacks } from '@Types/index';
import { useSyncExternalStore } from 'react';

import { RegisterStore } from '@Store/RegisterStore';
import { useMultiStepFormState } from './useMultiStepFormState';
import { useRegisterMutation, useRegisterState } from '@Contexts/RegisterContext';

export const useMultiStepFormControl = (formConfigs?: FormConfig[]) => {
  const dispatch = useRegisterMutation();
  const { formControl } = useRegisterState();

  const { isDisabledNext, currentFormIndex, formConfigs } = formControl;

  if (!formConfigs && formConfigs) {
  }
  // if (!RegisterStore.hasFormConfigs() && formConfigs) {
  //   RegisterStore.initiailizeFormConfigs(formConfigs);
  // }

  // const state = useSyncExternalStore(RegisterStore.subscribe, RegisterStore.getSnapShot);
  // const { updateError } = useMultiStepFormState();

  // const { _isDisabledNext, _currentFormIndex, _formConfigs } = state;

  // const moveToPrevForm = () => {
  //   RegisterStore.setIndex(_currentFormIndex - 1);
  //   RegisterStore.resetForm();
  // };

  // const moveToNextForm = () => {
  //   RegisterStore.setIndex(_currentFormIndex + 1);
  //   RegisterStore.resetForm();
  // };

  // const fieldSubmit = (formData: FormData, callbacks?: SubmitCallbacks) => {
  //   const { formId, submitFn } = _formConfigs![_currentFormIndex];
  //   const fieldValue = formData.get(formId) as string;

  //   submitFn(fieldValue, {
  //     ...callbacks!,
  //     onFail: (error: Error) => {
  //       updateError({ [formId]: error.message });
  //       callbacks?.onFail && callbacks.onFail(error);
  //     },
  //   });
  // };

  return {
    formConfig: _formConfigs![_currentFormIndex],
    isFirstForm: _currentFormIndex === 0,
    isLastForm: _currentFormIndex === _formConfigs!.length - 1,
    moveToPrevForm,
    moveToNextForm,

    isDisabledNext: _isDisabledNext,
    enableNext: RegisterStore.setIsDisabledNext,

    fieldSubmit,
    initializeHook: RegisterStore.initializeHook,
    resetForm: RegisterStore.resetForm,
  };
};
