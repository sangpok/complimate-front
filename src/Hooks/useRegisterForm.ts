import { FormConfig, SubmitCallbacks } from '@Types/index';
import { useSyncExternalStore } from 'react';

import { RegisterStore } from '@Store/RegisterStore';

export const useRegisterForm = (formConfigs?: FormConfig[]) => {
  if (!RegisterStore.hasFormConfigs() && formConfigs) {
    RegisterStore.initiailizeFormConfigs(formConfigs);
  }

  const state = useSyncExternalStore(RegisterStore.subscribe, RegisterStore.getSnapShot);

  const { _isDisabledNext, _submitError, _currentFormIndex, _formConfigs } = state;

  const moveToPrevForm = () => {
    RegisterStore.setIndex(_currentFormIndex - 1);
    RegisterStore.resetForm();
  };

  const moveToNextForm = () => {
    RegisterStore.setIndex(_currentFormIndex + 1);
    RegisterStore.resetForm();
  };

  const fieldSubmit = (formData: FormData, callbacks?: SubmitCallbacks) => {
    const { submitField, submitFn } = _formConfigs![_currentFormIndex];
    const fieldValue = formData.get(submitField) as string;

    submitFn(fieldValue, {
      ...callbacks!,
      onFail: (error: Error) => {
        RegisterStore.setError(error);
        callbacks?.onFail && callbacks.onFail(error);
      },
    });
  };

  return {
    formConfig: _formConfigs![_currentFormIndex],
    isFirstForm: _currentFormIndex === 0,
    isLastForm: _currentFormIndex === _formConfigs!.length - 1,
    moveToPrevForm,
    moveToNextForm,

    submitError: _submitError,
    setSubmitError: RegisterStore.setError,
    clearSubmitError: () => RegisterStore.setError(null),

    isDisabledNext: _isDisabledNext,
    disableNext: RegisterStore.setIsDisabledNext,

    fieldSubmit,
    initializeHook: RegisterStore.initializeHook,
    resetForm: RegisterStore.resetForm,
  };
};
