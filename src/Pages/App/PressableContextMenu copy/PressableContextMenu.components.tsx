/** @jsxImportSource @emotion/react */

/** React */
import type { PointerEvent } from 'react';

/** Style */
import * as S from './PressableContextMenu.styled';

/** Animation */
import { motion } from 'framer-motion';
import { buttonVariant, contextMenuVariants } from './PressableContextMenu.animation';

/** Hook */
import { usePressableContextMenu } from './usePressableContextMenu';

/** Type */
import type {
  ButtonPresenterProp,
  ContextMenuBoxProp,
  ContextMenuItemProp,
  TriggerButtonProp,
} from './PressableContextMenu.types';

const ButtonPresenter = ({ likeType, likeCount, text, isSelected }: ButtonPresenterProp) => {
  const iconMap = {
    LIKE: '👍',
    PRAY: '🙏',
    LAUGH_WITH_SAD: '🤣',
    HEART_EYES: '😍',
    ANGEL_SMILE: '😇',
  };

  return (
    <S.StyledButton className={isSelected ? 'selected' : ''}>
      <S.ButtonIcon>{iconMap[likeType]}</S.ButtonIcon>
      <S.ButtonText>{likeCount}</S.ButtonText>
    </S.StyledButton>
  );
};

export const TriggerButton = ({
  contextMenu,
  onPointerDown,
  onPointerUp,
  onHoverSelect,
}: TriggerButtonProp) => {
  const { buttonRef, isStartLongMenuAction, startLongMenu, moveLongMenu, cleanUpLongMenu } =
    usePressableContextMenu();

  const buttonAnimationState = isStartLongMenuAction ? 'pushed' : 'normal';

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startLongMenu(event);
    onPointerDown();
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    moveLongMenu(event, { onHover: onHoverSelect });
  };

  const handlePointerUp = () => {
    cleanUpLongMenu();
    onPointerUp();
  };

  return (
    <S.ButtonContainer
      ref={buttonRef}
      variants={buttonVariant}
      initial={false}
      animate={buttonAnimationState}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <ButtonPresenter {...contextMenu} />
    </S.ButtonContainer>
  );
};

const ContextMenuItem = ({ contextMenu, isHoverSelected, isSelectedItem }: ContextMenuItemProp) => {
  const itemAnimate = isHoverSelected ? 'pushed' : 'normal';

  return (
    <S.StyledLi variants={buttonVariant} initial={false} animate={itemAnimate}>
      <ButtonPresenter {...contextMenu} isSelected={isSelectedItem} />
    </S.StyledLi>
  );
};

export const ContextMenuBox = ({
  contextMenus,
  isPointerDown,
  selectedMenuId,
  hoverIndex,
}: ContextMenuBoxProp) => {
  const contextMenuAnimate = isPointerDown ? 'show' : 'hide';

  return (
    <S.ContextMenuBoxContainer
      variants={contextMenuVariants}
      initial={false}
      animate={contextMenuAnimate}
    >
      <S.StyledUl>
        {contextMenus.map((contextMenu) => (
          <ContextMenuItem
            key={`menu-${contextMenu.likeType}`}
            contextMenu={contextMenu}
            isSelectedItem={contextMenu.id === selectedMenuId}
            isHoverSelected={contextMenu.id === hoverIndex}
          />
        ))}
      </S.StyledUl>
    </S.ContextMenuBoxContainer>
  );
};
