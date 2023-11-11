import { AnimationScope } from 'framer-motion';

export type StickerButtonProp = {
  onClick: () => void;
  onPointerDown: () => void;
  onPointerUp: () => void;
  heartRef: AnimationScope;
  isHeartClicked: boolean;
  stickerCount: number;
};
