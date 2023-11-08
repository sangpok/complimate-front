/** React */
import React, { PointerEvent, useRef, useState, useEffect, useCallback } from 'react';

/** Style */
import * as S from './ContentCard.styled';
import * as Dialog from '@radix-ui/react-dialog';

/** Component */
import InlineProfile from '@Components/InlineProfile';
import PostUserInfo from '@Components/PostUserInfo';
import * as C from './Components';

/** Icon */
import * as Icon from '@Icons/index';

/** Animate */
import {
  AnimatePresence,
  PanInfo,
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
} from 'framer-motion';

/** Hook */
import { mergeRefs } from 'react-merge-refs';
import useMeasure from 'react-use-measure';

/** Type */
import { ContentCardProp, TransitionDirection } from './ContentCard.types';
import styled from '@emotion/styled';
import PostImageList from '../../../../Components/PostImageList';
import { useDoubleTap } from '@Hooks/useDoubleTab';

const ContentCard = React.memo(
  ({ post, onTransitionRaise, onCommentClick, onHeartClick }: ContentCardProp) => {
    const containerDragControls = useDragControls();
    const bodyDragControls = useDragControls();

    const [heartRef, animateHeart] = useAnimate();

    const [isHeartClicked, setIsHeartClicked] = useState(false);

    const [bodyRef, bodyBounds] = useMeasure();
    const [bodyContentRef, bodyContentBounds] = useMeasure();

    const y = useMotionValue(0);

    const cardBodyRef = useRef<HTMLDivElement>(null);
    const clickedPos = useRef(0);
    const isClicked = useRef(false);
    const isCardDragging = useRef(false);
    const couldTransition = useRef(false);
    const scrollPositionState = useRef({ isScrollFront: false, isScrollEnd: false });

    const isOverflow = bodyBounds.height < bodyContentBounds.height;

    const handleBodyPointerDown = (event: PointerEvent<HTMLDivElement>) => {
      isCardDragging.current = false;
      isClicked.current = true;
      clickedPos.current = event.clientY;

      const contentEndPosY = bodyBounds.height - bodyContentBounds.height;

      const isScrollFront = y.get() === 0;
      const isScrollEnd = y.get() === contentEndPosY;

      scrollPositionState.current = { isScrollFront, isScrollEnd };

      if (isScrollFront || isScrollEnd) {
        couldTransition.current = true;
      }
    };

    const handleBodyPointerMove = (event: PointerEvent<HTMLDivElement>) => {
      if (!isClicked.current || isCardDragging.current) return;

      const deltaPos = clickedPos.current - event.clientY;
      const isNoMovement = deltaPos === 0;

      if (isNoMovement) return;

      isCardDragging.current = true;

      if (!isOverflow) {
        containerDragControls.start(event);
        return;
      }

      if (!couldTransition.current) {
        bodyDragControls.start(event);
        return;
      }

      const { isScrollFront, isScrollEnd } = scrollPositionState.current;
      const direction = deltaPos < 0 ? TransitionDirection.Down : TransitionDirection.Up;
      const wouldDragToPrev = isScrollFront && direction === TransitionDirection.Down;
      const wouldDragToNext = isScrollEnd && direction === TransitionDirection.Up;
      const wouldTransitionDrag = wouldDragToPrev || wouldDragToNext;

      if (wouldTransitionDrag) {
        containerDragControls.start(event);
        return;
      }

      couldTransition.current = false;
      bodyDragControls.start(event);
    };

    const handleBodyPointerUp = useCallback(() => {
      isClicked.current = false;
      isCardDragging.current = false;
      couldTransition.current = false;
    }, []);

    const handleContainerDragEnd = (_: unknown, panInfo: PanInfo) => {
      const { offset, velocity } = panInfo;

      const curDirection = offset.y < 0 ? TransitionDirection.Up : TransitionDirection.Down;

      const offsetThreshold = document.body.clientHeight / 3;
      const veloctiyThreshold = 100;

      const overOffset = Math.abs(offset.y) > offsetThreshold;
      const overVelocity = Math.abs(velocity.y) > veloctiyThreshold;
      const couldTransition = overOffset || overVelocity;

      if (couldTransition) {
        onTransitionRaise(curDirection);
      }
    };

    const handleContainerPointerDown = (event: PointerEvent<HTMLDivElement>) => {
      const isSelectedBody = event.currentTarget.dataset.component === 'body';
      const couldCardDrag = !isOverflow && !isSelectedBody;

      if (couldCardDrag) {
        containerDragControls.start(event);
        containerDragControls;
      }
    };

    const handleHeartClick = () => {
      setIsHeartClicked((prev) => !prev);
      onHeartClick(post.id);
    };

    const animateHeartDown = useCallback(() => animateHeart(heartRef.current, { scale: 0.7 }), []);
    const animateHeartUp = useCallback(async () => {
      await animateHeart(heartRef.current, { scale: 1.2 });
      await animateHeart(heartRef.current, { scale: 1 });
    }, []);

    const animateHeartbeat = useCallback(async () => {
      await animateHeartDown();
      await animateHeartUp();
    }, []);

    const doubleTabEvent = useDoubleTap(() => {
      setIsHeartClicked((prev) => !prev);
      onHeartClick(post.id);
      animateHeartbeat();
    });

    return (
      <S.CardContainer
        key={JSON.stringify(bodyBounds)}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragListener={false}
        dragControls={containerDragControls}
        dragDirectionLock
        onPointerDown={handleContainerPointerDown}
        onDragEnd={handleContainerDragEnd}
        className="칭찬해줘 한 개"
      >
        <S.CardHedaer className="유저 정보 및 칭찬스티커">
          <PostUserInfo
            date={`${post.date}`}
            nickname={`${post.author}`}
            profile={`${post.profile}`}
          />

          <C.StickerButton
            onClick={handleHeartClick}
            onPointerDown={() => animateHeartDown()}
            onPointerUp={() => animateHeartUp()}
            heartRef={heartRef}
            isHeartClicked={isHeartClicked}
            stickerCount={post.stickerCount}
          />
        </S.CardHedaer>

        <S.CardBody
          data-component="body"
          className="칭찬해줘"
          ref={mergeRefs([cardBodyRef, bodyRef])}
          {...doubleTabEvent}
        >
          <motion.div
            key={JSON.stringify(bodyBounds)}
            ref={bodyContentRef}
            style={{ y }}
            drag="y"
            dragListener={false}
            dragDirectionLock
            dragElastic={false}
            // dragConstraints={cardBodyRef}
            dragConstraints={
              isOverflow && {
                top: -(bodyContentBounds.height - bodyBounds.height),
                bottom: 0,
              }
            }
            dragControls={bodyDragControls}
            onPointerDown={handleBodyPointerDown}
            onPointerUp={handleBodyPointerUp}
            onPointerMove={handleBodyPointerMove}
          >
            {post.images.length !== 0 && <PostImageList images={post.images} />}

            {/* 칭찬해줘 본문 */}
            <div className="cc-body-text">
              <p data-component="body">{post.body}</p>
            </div>
          </motion.div>
        </S.CardBody>

        <C.BestCommentList bestComments={post.bestComments} onMoreClick={() => onCommentClick()} />
      </S.CardContainer>
    );
  }
);

export default ContentCard;
