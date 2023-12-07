import { FormConfig } from '@Types/index';

type RegisterStoreState = {
  _isDisabledNext: boolean;
  _submitError: Error | null;
  _currentFormIndex: number;
  _formConfigs: FormConfig[] | null;
};

const initialState: RegisterStoreState = {
  _isDisabledNext: false,
  _submitError: null,
  _currentFormIndex: 0,
  _formConfigs: null,
};

let _states: RegisterStoreState = {
  ...initialState,
};

let listeners: (() => void)[] = [];

const emitChange = () => {
  listeners.forEach((l) => l());
};

const updateState = (newField: Partial<RegisterStoreState>) => {
  _states = {
    ..._states,
    ...newField,
  };

  emitChange();
};

export const RegisterStore = {
  subscribe(listener: () => void) {
    listeners = [...listeners, listener];

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  getSnapShot: () => _states,

  initializeHook: () => updateState({ ...initialState }),
  resetForm: () => updateState({ _submitError: null, _isDisabledNext: false }),

  getError: () => _states._submitError,
  setError: (error: Error | null) => updateState({ _submitError: error }),

  getIndex: () => _states._currentFormIndex,
  setIndex: (newValue: number) => updateState({ _currentFormIndex: newValue }),

  hasFormConfigs: () => _states._formConfigs !== null,
  getFormConfigs: () => _states._formConfigs,
  setFormConfigs: (newValue: FormConfig[]) => updateState({ _formConfigs: newValue }),
  initiailizeFormConfigs: (formConfigs: FormConfig[]) => updateState({ _formConfigs: formConfigs }),

  getIsDisabledNext: () => _states._isDisabledNext,
  setIsDisabledNext: (newValue: boolean) => updateState({ _isDisabledNext: newValue }),
};
