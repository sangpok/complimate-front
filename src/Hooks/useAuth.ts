import { useState } from 'react';
import { useLogin, useLogout } from '.';

let hasAuthRaw = false;

import * as API from '@API/index';
import { UserAuth } from '@Types/index';

// const useAuth = () => {

//   return {
//     hasAuth,
//     updateAuth,
//   };
// };

export const useAuth = () => {
  const [hasAuth, setHasAuth] = useState(hasAuthRaw);

  const { mutate: mutateLogin } = useLogin();
  const { mutate: mutateLogout } = useLogout();

  const updateAuth = (newValue: boolean) => {
    hasAuthRaw = newValue;
    setHasAuth(newValue);
  };

  const checkSession = async () => {
    try {
      await API.getAuthStatus();
      return true;
    } catch (error) {
      return false;
    }
  };

  const signIn = (
    loginData: Omit<UserAuth, 'nickname'>,
    callbakcs?: { onError?: (error: Error) => void; onSuccess?: () => void }
  ) => {
    mutateLogin(loginData, {
      onError: (error) => {
        callbakcs?.onError && callbakcs?.onError(error);
      },
      onSuccess: () => callbakcs?.onSuccess && callbakcs?.onSuccess(),
    });
  };

  const signOut = (callbakcs?: { onError?: (error: Error) => void; onSuccess?: () => void }) => {
    mutateLogout(undefined, {
      onError: (error) => {
        callbakcs?.onError && callbakcs?.onError(error);
      },
      onSuccess: () => callbakcs?.onSuccess && callbakcs?.onSuccess(),
    });
  };

  return { hasAuth, updateAuth, signIn, signOut, checkSession };
};
