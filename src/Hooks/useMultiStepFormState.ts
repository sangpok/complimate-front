import React, { useState } from 'react';

type MultiStepFormState = {
  [k: string]: string;
};

type MultiStepFormError = {
  [k: string]: string | null;
};

let _fieldState: MultiStepFormState | null = null;
let _errorState: MultiStepFormError | null = null;

export const useMultiStepFormState = (initialData?: MultiStepFormState) => {
  const hasNoState = _fieldState === null;

  if (hasNoState && initialData) {
    _fieldState = initialData;
    _errorState = Object.keys(initialData).reduce((acc, cur) => {
      acc[cur] = null;
      return acc;
    }, {} as MultiStepFormError);
  }

  const [fieldState, setFieldState] = useState(_fieldState);
  const [errorState, setErrorState] = useState(_errorState);

  const updateField = (field: object) => {
    _fieldState = { ..._fieldState, ...field };
    setFieldState((prev) => ({ ...prev, ...field }));
  };

  const updateError = (field: object) => {
    _errorState = { ..._errorState, ...field };
    setErrorState((prev) => ({ ...prev, ...field }));
  };

  const resetAllState = () => {
    _fieldState = null;
    _errorState = null;

    setFieldState(null);
    setErrorState(null);
  };

  return {
    fieldState,
    errorState,
    updateField,
    updateError,
    clearFieldError: (field: string) => updateError({ [field]: null }),
    resetAllState,
  };
};
