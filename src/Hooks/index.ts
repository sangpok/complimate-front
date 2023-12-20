import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as API from '@API/index';
import { SubmitCallbacks } from '@Types/index';

export const useCheckEmail = () => {
  const queryClient = useQueryClient();

  const checkEmail = (email: string, callbacks?: SubmitCallbacks) => {
    queryClient
      .fetchQuery({
        queryKey: ['checkEmail', email],
        queryFn: () => API.checkEmail(email),
      })
      .then((response) => {
        if (response === null) {
          return callbacks?.onFail && callbacks.onFail(new Error('먼가 잘못됨'));
        }

        const { isAvailable: isAvailableEmail } = response;

        if (!isAvailableEmail) {
          return callbacks?.onFail && callbacks.onFail(new Error('이메일 중복'));
        }

        return callbacks?.onSuccess && callbacks.onSuccess();
      })
      .catch((error) => {
        return callbacks?.onFail && callbacks.onFail(new Error(error));
      })
      .finally(() => callbacks?.onSettled && callbacks.onSettled());
  };

  return { checkEmail };
};

export const useCheckPassword = () => {
  const checkPassword = (password: string, callbacks?: SubmitCallbacks) => {
    callbacks?.onSuccess && callbacks.onSuccess();
    callbacks?.onSettled && callbacks.onSettled();
  };

  return { checkPassword };
};

export const useCheckNickname = () => {
  const queryClient = useQueryClient();

  const checkNickname = (nickname: string, callbacks?: SubmitCallbacks) => {
    queryClient
      .fetchQuery({
        queryKey: ['checkNickname', nickname],
        queryFn: () => API.checkNickname(nickname),
      })
      .then((response) => {
        if (response === null) {
          return callbacks?.onFail && callbacks.onFail(new Error('먼가 잘못됨'));
        }

        const { isAvailable: isAvailableNickname } = response;

        if (!isAvailableNickname) {
          return callbacks?.onFail && callbacks.onFail(new Error('닉네임 중복'));
        }

        return callbacks?.onSuccess && callbacks.onSuccess();
      })
      .catch((error) => {
        return callbacks?.onFail && callbacks.onFail(new Error(error));
      })
      .finally(() => callbacks?.onSettled && callbacks.onSettled());
  };

  return { checkNickname };
};

export const useCreateAccount = () => {
  return useMutation({
    mutationKey: ['createAccount'],
    mutationFn: API.createAccount,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: API.login,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: API.logout,
  });
};

export const useGetPosts = (lastViewId: number) => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => API.getPosts(lastViewId),
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationKey: ['createPost'],
    mutationFn: API.createPost,
  });
};

export const useGetComments = (postId: number) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => API.getComments(postId),
  });
};

export const useGetReplys = (postId: number, commentId?: number) => {
  return useQuery({
    queryKey: ['replys', postId, commentId],
    queryFn: () => API.getReplys({ postId, commentId: commentId! }),
    enabled: commentId !== undefined,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createComment'],
    mutationFn: API.createComment,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', variables.postId] });
      queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });

      if (variables.parentId) {
        queryClient.invalidateQueries({
          queryKey: ['replys', variables.postId, variables.parentId],
        });
      }
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['likePost'],
    mutationFn: API.likePost,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['likeComment'],
    mutationFn: API.likeComment,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['replys'] });
    },
  });
};
