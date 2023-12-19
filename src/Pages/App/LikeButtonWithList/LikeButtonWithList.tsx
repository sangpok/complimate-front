import { PostLike } from '@Types/index';
import { PressableContextMenu } from '../PressableContextMenu';

import { Variants } from 'framer-motion';
import * as S from './LikeButtonWithList.styled';

export const buttonVariant: Variants = {
  pushed: (isSelected) => ({ scale: 0.9, background: isSelected ? '#e9e9e9' : '#f2f2f2' }),
  normal: (isSelected) => ({ scale: 1, background: isSelected ? '#e9e9e9' : '#fff' }),
};

export const contextMenuVariants: Variants = {
  show: {
    scale: 1,
    opacity: 1,
    originY: 0,
    transition: {
      type: 'spring',
      duration: 0.5,
      delay: 0.2,
    },
  },

  hide: {
    scale: 0.9,
    opacity: 0,
  },
};

type LikeButtonWithListProp = {
  likeCount: number;
  likeList: PostLike[];
  onSelectLike: (prevLike: PostLike | undefined, newLike: PostLike) => void;
};

const iconMap = {
  LIKE: '👍',
  PRAY: '🙏',
  LAUGH_WITH_SAD: '🤣',
  HEART_EYES: '😍',
  ANGEL_SMILE: '😇',
};

export const LikeButtonWithList = ({
  likeCount,
  likeList,
  onSelectLike,
}: LikeButtonWithListProp) => {
  const currentLike = likeList.find(({ isLiked }) => isLiked);
  const triggerIcon = iconMap[currentLike?.likeType || 'LIKE'];

  const handleSelect = (selectedIndex: number) => {
    if (0 <= selectedIndex && selectedIndex < 5) {
      onSelectLike(currentLike, likeList[selectedIndex]);
    }
  };

  const returnTriggerButton = (isPressed: boolean) => {
    const buttonAnimateState = isPressed ? 'pushed' : 'normal';

    return (
      <S.Button variants={buttonVariant} initial={false} animate={buttonAnimateState}>
        <p>{triggerIcon}</p>
        <p>{likeCount}</p>
      </S.Button>
    );
  };

  const returnContextMenu = (isOpened: boolean, hoverIndex: number) => {
    const ulAnimateState = isOpened ? 'show' : 'hide';

    return (
      <S.Ul variants={contextMenuVariants} initial={false} animate={ulAnimateState}>
        {likeList.map(({ likeType, likeCount, isLiked }, index) => {
          const buttonAnimateState = hoverIndex === index ? 'pushed' : 'normal';

          return (
            <S.Button
              key={`emotion-${likeType}`}
              variants={buttonVariant}
              initial={false}
              custom={isLiked}
              animate={buttonAnimateState}
            >
              <p>{iconMap[likeType]}</p>
              <p>{likeCount}</p>
            </S.Button>
          );
        })}
      </S.Ul>
    );
  };

  return (
    <PressableContextMenu
      onSelect={handleSelect}
      triggerButton={returnTriggerButton}
      contextMenu={returnContextMenu}
    />
  );
};
