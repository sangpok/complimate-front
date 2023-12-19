import { ComplementPost, LikeType, PostLike } from '@Types/index';
import { useSyncExternalStore } from 'react';

export type AppStoreState = {
  isSideMenuOpen: boolean /** 사이드 메뉴 오픈 Flag */;
  isCommentDrawerOpen: boolean /** 댓글 서랍 오픈 Falg */;
  currentPostIndex: number /** 현재 불러온 Post의 Index */;
  currentPostId: number /** 현재 불러온 Post의 Id */;
  lastViewId: number /** 마지막으로 불러온 Post의 Id */;
  progressDirection: number /** 애니메이션 진행 방향(다음/이전) */;
  newLikeType: LikeType | null /** 좋아요 정보 */;
};

const initialState = {
  isSideMenuOpen: false,
  isCommentDrawerOpen: false,
  currentPostId: 0,
  currentPostIndex: 0,
  lastViewId: 0,
  progressDirection: 1,
  newLikeType: null,
} as AppStoreState;

let state = { ...initialState };

let listeners: (() => void)[] = [];

const emitChange = () => {
  listeners.forEach((l) => l());
};

export const AppStore = {
  subscribe(listener: () => void) {
    listeners = [...listeners, listener];

    return () => {
      listeners = [...listeners.filter((l) => l !== listener)];
    };
  },

  getSnapShot: () => state,

  updateState(newField: Partial<AppStoreState>) {
    state = { ...state, ...newField };
    emitChange();
  },

  showSideMenu() {
    this.updateState({ isSideMenuOpen: true });
  },

  hideSideMenu() {
    this.updateState({ isSideMenuOpen: false });
  },

  showCommentDrawer() {
    this.updateState({ isCommentDrawerOpen: true });
  },

  hideCommentDrawer() {
    this.updateState({ isCommentDrawerOpen: false });
  },

  setPostIndex(postIndex: number) {
    this.updateState({ currentPostIndex: postIndex });
  },

  prevPost() {
    this.updateState({ progressDirection: -1 });
    this.setPostIndex(state.currentPostIndex - 1);
  },

  nextPost() {
    this.updateState({ progressDirection: 1 });
    this.setPostIndex(state.currentPostIndex + 1);
  },

  setCurrentPostId(postId: number) {
    this.updateState({ currentPostId: postId });
  },

  setNewLikeType(likeType: LikeType) {
    this.updateState({ newLikeType: likeType });
  },

  clearNewLikeType() {
    this.updateState({ newLikeType: null });
  },
};

export const useAppStore = <T>(field: keyof AppStoreState) =>
  useSyncExternalStore(AppStore.subscribe, () => AppStore.getSnapShot()[field]) as T;
