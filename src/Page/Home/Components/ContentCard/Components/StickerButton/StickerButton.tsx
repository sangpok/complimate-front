import React from 'react';
import * as S from './StickerButton.styled';
import { motion } from 'framer-motion';
import { StickerButtonProp } from './StickerButton.types';

export const StickerButton = React.memo(
  ({
    onClick,
    onPointerDown,
    onPointerUp,
    heartRef,
    isHeartClicked,
    stickerCount,
  }: StickerButtonProp) => {
    return (
      <S.Sticker className="cc-sticker">
        <button onClick={onClick} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
          <motion.div ref={heartRef}>
            {isHeartClicked ? <S.HeartFilIcon /> : <S.HeartIcon />}
          </motion.div>
          <p>{stickerCount}</p>
        </button>
        <div className="공감 목록" />
      </S.Sticker>
    );
  }
);
