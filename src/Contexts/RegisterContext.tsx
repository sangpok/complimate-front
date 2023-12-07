import { FormConfig, SubmitCallbacks } from '@Types/index';
import { ReactNode, createContext, useContext, useState } from 'react';

type MultiStepFormState = {
  [k: string]: string;
};

type MultiStepFormError = {
  [k: string]: string | null;
};

type FormStateType = {
  fieldState: MultiStepFormState;
  errorState: MultiStepFormError;
};

type FormControlType = {
  isDisabledNext: boolean;
  currentFormIndex: number;
  formConfigs: FormConfig[] | null;
};

type RegisterState = {
  formState: FormStateType;
  formControl: FormControlType;
  animateState: AnimateState;
};

type MutationType = {
  resetFormControl: () => void;
  moveToPrevForm: () => void;
  moveToNextForm: () => void;
  disableNext: (isDisabledNext: boolean) => void;
  initiailizeFormConfigs: (formConfigs: FormConfig[]) => void;
  initializeFormState: (initialData: MultiStepFormState) => void;
  updateField: (field: MultiStepFormState) => void;
  updateError: (field: MultiStepFormError) => void;
  clearFieldError: (field: string) => void;
  fieldSubmit: (formData: FormData, callbacks?: SubmitCallbacks) => void;
  changeDirectionToNext: () => void;
  changeDirectionToPrev: () => void;
  setAnimatingStateToStart: () => void;
  setAnimatingStateToEnd: () => void;
};

const initialData: RegisterState = {
  formState: {
    fieldState: {},
    errorState: {},
  },
  formControl: {
    isDisabledNext: true,
    currentFormIndex: 0,
    formConfigs: null,
  },
  animateState: {
    progressDirection: -1,
    isAnimating: false,
  },
};

type AnimateState = {
  progressDirection: number;
  isAnimating: boolean;
};

const RegisterContextState = createContext<RegisterState>(initialData);
const RegisterContextMutation = createContext<MutationType>({} as MutationType);

export const useRegisterState = () => useContext(RegisterContextState);
export const useRegisterMutation = () => useContext(RegisterContextMutation);

export const RegisterContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<RegisterState>(initialData);

  /* #region About Form */
  const updateFormControl = (newField: Partial<FormControlType>) => {
    setState((prevState) => ({
      ...prevState,
      formControl: {
        ...prevState.formControl,
        ...newField,
      },
    }));
  };

  const updateFormState = (newField: Partial<FormStateType>) => {
    setState((prevState) => ({
      ...prevState,
      formState: {
        ...prevState.formState,
        ...newField,
      },
    }));
  };

  const updateFieldState = (newField: MultiStepFormState) => {
    setState((prevData) => ({
      ...prevData,
      formState: {
        ...prevData.formState,
        fieldState: {
          ...prevData.formState.fieldState,
          ...newField,
        },
      },
    }));
  };

  const updateErrorState = (newField: MultiStepFormError) => {
    setState((prevData) => ({
      ...prevData,
      formState: {
        ...prevData.formState,
        errorState: {
          ...prevData.formState.errorState,
          ...newField,
        },
      },
    }));
  };

  const resetFormControl = () => {
    updateFormControl({ isDisabledNext: true });
  };

  const moveToPrevForm = () => {
    updateFormControl({ currentFormIndex: state.formControl.currentFormIndex - 1 });
  };

  const moveToNextForm = () => {
    updateFormControl({ currentFormIndex: state.formControl.currentFormIndex + 1 });
  };

  const disableNext = (isDisabledNext: boolean) => {
    updateFormControl({ isDisabledNext });
  };

  const initiailizeFormConfigs = (formConfigs: FormConfig[]) => {
    updateFormControl({ formConfigs });
  };

  const initializeFormState = (initialData: MultiStepFormState) => {
    updateFormState({
      fieldState: { ...initialData },
      errorState: Object.keys(initialData).reduce((acc, cur) => {
        acc[cur] = null;
        return acc;
      }, {} as MultiStepFormError),
    });
  };

  const updateField = (field: MultiStepFormState) => {
    updateFieldState({ ...field });
  };

  const updateError = (field: MultiStepFormError) => {
    updateErrorState({ ...field });
  };

  const clearFieldError = (field: string) => {
    updateError({ [field]: null });
  };

  const fieldSubmit = (formData: FormData, callbacks?: SubmitCallbacks) => {
    const { formId, submitFn } = state.formControl.formConfigs![state.formControl.currentFormIndex];
    const fieldValue = formData.get(formId) as string;

    console.log({ formId, fieldValue });

    submitFn(fieldValue, {
      ...callbacks!,
      onFail: (error: Error) => {
        updateError({ [formId]: error.message });
        callbacks?.onFail && callbacks.onFail(error);
      },
    });
  };
  /* #endregion */

  const updateAnimateState = (field: Partial<AnimateState>) => {
    setState((prevData) => ({
      ...prevData,
      animateState: {
        ...prevData.animateState,
        ...field,
      },
    }));
  };

  const changeDirectionToNext = () => {
    updateAnimateState({ progressDirection: 1 });
  };

  const changeDirectionToPrev = () => {
    updateAnimateState({ progressDirection: -1 });
  };

  const setAnimatingStateToStart = () => {
    updateAnimateState({ isAnimating: true });
  };

  const setAnimatingStateToEnd = () => {
    updateAnimateState({ isAnimating: false });
  };

  const Mutations: MutationType = {
    resetFormControl,
    moveToPrevForm,
    moveToNextForm,
    disableNext,
    initiailizeFormConfigs,
    initializeFormState,
    updateField,
    updateError,
    clearFieldError,
    fieldSubmit,
    changeDirectionToNext,
    changeDirectionToPrev,
    setAnimatingStateToStart,
    setAnimatingStateToEnd,
  };

  return (
    <RegisterContextState.Provider value={state}>
      <RegisterContextMutation.Provider value={{ ...Mutations }}>
        {children}
      </RegisterContextMutation.Provider>
    </RegisterContextState.Provider>
  );
};
