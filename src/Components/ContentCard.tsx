/** React */
import { PointerEvent, useRef, useState } from 'react';

/** Style */
import * as S from './ContentCard.styled';
import * as Dialog from '@radix-ui/react-dialog';

/** Component */
import InlineProfile from './InlineProfile';
import PostUserInfo from './PostUserInfo';

/** Icon */
import * as Icon from '@Icons/index';

/** Animate */
import { PanInfo, motion, useAnimate, useDragControls, useMotionValue } from 'framer-motion';

/** Hook */
import { mergeRefs } from 'react-merge-refs';
import useMeasure from 'react-use-measure';

/** Type */
import { ContentCardProp, TransitionDirection } from './ContentCard.types';
import { styled } from '@/stitches.config';
import PostImageList from './PostImageList';

const DialogOverlay = styled(motion(Dialog.Overlay), {
  background: 'rgba(0 0 0 / 0.5)',
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  zIndex: 99,
  willChange: 'opacity',
});

const DialogContent = styled(motion(Dialog.Content), {
  position: 'absolute',
  top: '$content',
  left: 0,
  width: '100dvw',
  height: '100%',
  background: 'white',
  padding: '30px',
  zIndex: 99,
  willChange: 'transform',
  borderRadius: '$large',
});

const ContentCard = ({ post, onTransitionRaise }: ContentCardProp) => {
  const containerDragControls = useDragControls();
  const bodyDragControls = useDragControls();

  const [scope, animate] = useAnimate();
  const [scopee, animatee] = useAnimate();

  const [open, setOpen] = useState(false);

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

    console.log('머여? 그러면 되야하는 거 아녀?');

    couldTransition.current = false;
    bodyDragControls.start(event);
  };

  const handleBodyPointerUp = () => {
    isClicked.current = false;
    isCardDragging.current = false;
    couldTransition.current = false;
  };

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
    }
  };

  const handleOpenChange = (open: boolean) => {
    // setOpen(open);
    if (!open) {
      Promise.all([
        animate(scope.current, { opacity: 0 }),
        animatee(scopee.current, { y: '100%' }),
      ]).then(() => {
        setOpen(false);
      });
    }
  };
  return (
    <S.CardContainer
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

        <S.Sticker className="cc-sticker">
          <button>
            <Icon.Heart />
          </button>
          <p>{`${post.stickerCount}`}</p>
          <div className="공감 목록" />
        </S.Sticker>
      </S.CardHedaer>

      <S.CardBody
        data-component="body"
        className="칭찬해줘"
        ref={mergeRefs([cardBodyRef, bodyRef])}
      >
        <motion.div
          ref={bodyContentRef}
          style={{ y }}
          drag="y"
          dragListener={false}
          dragDirectionLock
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

      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <S.BestCommentSection className="베댓">
          <div className="베댓 Wrapper">
            <div className="베댓 콘텐츠">
              <div className="베댓 카드">
                <S.BestCardContent className="베댓 카드 콘텐츠">
                  <S.BestCommentHeader className="베댓 카드 정보 및 메뉴">
                    <S.BestCommentInfo className="베댓 정보">
                      <InlineProfile
                        type="normal"
                        nickname={post.bestComments[0].author}
                        profile={post.bestComments[0].profile}
                      />
                      <S.Time>{post.bestComments[0].date}</S.Time>
                    </S.BestCommentInfo>

                    <S.CommentMenu className="메뉴">
                      <Icon.More width="1.125rem" height="1.125rem" />
                    </S.CommentMenu>
                  </S.BestCommentHeader>

                  <S.CommentBody className="베댓 본문">{post.bestComments[0].body}</S.CommentBody>
                  <S.CommentLike className="베댓 좋아요">
                    <Icon.Heart />
                    <span>{post.bestComments[0].stickerCount}</span>
                  </S.CommentLike>
                </S.BestCardContent>
              </div>
            </div>
          </div>

          <Dialog.Trigger asChild>
            <S.MoreButton onClick={() => setOpen(true)}>
              <Icon.Comment css={{ color: '$point' }} />
              <span>{post.bestComments.length}개의 댓글 더 보기</span>
            </S.MoreButton>
          </Dialog.Trigger>

          <Dialog.Portal>
            <DialogOverlay ref={scope} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <DialogContent ref={scopee} initial={{ y: '100%' }} animate={{ y: 0 }}>
                뭘봐ㅋㅋ
              </DialogContent>
            </DialogOverlay>
          </Dialog.Portal>
        </S.BestCommentSection>
      </Dialog.Root>
      {/* 
            <section className="댓글 Drawer">
              <div className="Drawer Handle" />
              <div className="Drawer Content">
                <div className="댓글 개수 및 필터">
                  <p className="댓글 개수">총 3개의 댓글</p>
                  <button className="필터">공감순</button>
                </div>

                <div className="댓글 목록">
                  <div className="댓글 컨테이너">
                    <div className="댓글 원글">
                      <div className="댓글 원글 콘텐츠">
                        <div className="header" />
                        <div className="body" />
                        <div className="footer" />
                      </div>
                    </div>

                    <div className="대댓 목록">
                      <div className="대댓">
                        <div className="headaer" />
                        <div className="body" />
                        <div className="footer" />
                      </div>

                      <div className="대댓">
                        <div className="headaer" />
                        <div className="body" />
                        <div className="footer" />
                      </div>
                    </div>
                  </div>
                  <div className="댓글 컨테이너">
                    <div className="댓글 원글">
                      <div className="댓글 원글 콘텐츠">
                        <div className="header" />
                        <div className="body" />
                        <div className="footer" />
                      </div>
                    </div>

                    <div className="대댓 목록">
                      <div className="대댓">
                        <div className="headaer" />
                        <div className="body" />
                        <div className="footer" />
                      </div>

                      <div className="대댓">
                        <div className="headaer" />
                        <div className="body" />
                        <div className="footer" />
                      </div>
                    </div>
                  </div>
                  <div className="댓글 더 불럴오기" />
                </div>

                <div className="댓글 작성란">
                  <div className="입력란">
                    <div className="답글 정보">
                      <button className="답글 취소" />
                      <div className="답글 정보 콘텐츠" />
                    </div>

                    <div className="입력 상자" />
                  </div>

                  <div className="입력 버튼" />
                </div>
              </div>
            </section> */}
    </S.CardContainer>
  );
};

export default ContentCard;
