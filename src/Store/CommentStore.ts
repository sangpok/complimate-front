import { Comment, ComplementPost } from '@Types/index';
import { useSyncExternalStore } from 'react';

export type CommentSubmitMode = 'comment' | 'reply';

export type CommentStoreState = {
  submitMode: CommentSubmitMode;
  replyTarget: Comment | null;
};

const initialState = {
  submitMode: 'comment',
  replyTarget: null,
} as CommentStoreState;

let state = { ...initialState };

let listeners: (() => void)[] = [];

const emitChange = () => {
  listeners.forEach((l) => l());
};

export const CommentStore = {
  subscribe(listener: () => void) {
    listeners = [...listeners, listener];

    return () => {
      listeners = [...listeners.filter((l) => l !== listener)];
    };
  },

  getSnapShot: () => state,

  updateState(newField: Partial<CommentStoreState>) {
    state = { ...state, ...newField };
    emitChange();
  },

  changeModeToReply(replyTarget: Comment) {
    this.updateState({ submitMode: 'reply', replyTarget });
  },

  clearReplyMode() {
    this.updateState({ submitMode: 'comment', replyTarget: null });
  },
};

export const useCommentStore = <T>(field: keyof CommentStoreState) =>
  useSyncExternalStore(CommentStore.subscribe, () => CommentStore.getSnapShot()[field]) as T;
