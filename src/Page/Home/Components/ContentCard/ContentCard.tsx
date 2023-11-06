/** React */
import { PointerEvent, useRef, useState, useEffect } from 'react';

/** Style */
import * as S from './ContentCard.styled';
import * as Dialog from '@radix-ui/react-dialog';

/** Component */
import InlineProfile from '../../../../Components/InlineProfile';
import PostUserInfo from '../../../../Components/PostUserInfo';

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
import { styled } from '@/stitches.config';
import PostImageList from '../../../../Components/PostImageList';
import { useDoubleTap } from '@Hooks/useDoubleTab';

const ContentCard = ({
  post,
  onTransitionRaise,
  onCommentClick,
  onHeartClick,
}: ContentCardProp) => {
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

  const handleHeartClick = () => {
    setIsHeartClicked((prev) => !prev);
    onHeartClick(post.id);
  };

  const animateHeartDown = () => animateHeart(heartRef.current, { scale: 0.7 });
  const animateHeartUp = async () => {
    await animateHeart(heartRef.current, { scale: 1.2 });
    await animateHeart(heartRef.current, { scale: 1 });
  };

  const animateHeartbeat = async () => {
    await animateHeartDown();
    await animateHeartUp();
  };

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
      // onClick={(event) => {
      //   // alert(event);
      //   console.log({ event });
      //   if (event.detail === 2) {
      //     // alert('Asdf');
      //     setIsHeartClicked((prev) => !prev);
      //     animateHeartbeat();
      //   }
      // }}
      // onTap={(event, info) => {
      //   console.log({ event, info });
      // }}
      className="칭찬해줘 한 개"
    >
      <S.CardHedaer className="유저 정보 및 칭찬스티커">
        <PostUserInfo
          date={`${post.date}`}
          nickname={`${post.author}`}
          profile={`${post.profile}`}
        />

        <S.Sticker className="cc-sticker">
          <button
            onClick={handleHeartClick}
            onPointerDown={() => animateHeartDown()}
            onPointerUp={() => animateHeartUp()}
          >
            <motion.div ref={heartRef}>
              {isHeartClicked ? <Icon.HeartFilled /> : <Icon.Heart />}
            </motion.div>
            <p>{`${post.stickerCount}`}</p>
          </button>
          <div className="공감 목록" />
        </S.Sticker>
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

        <S.MoreButton onClick={() => onCommentClick()}>
          <Icon.Comment css={{ color: '$point' }} />
          <span>{post.bestComments.length}개의 댓글 더 보기</span>
        </S.MoreButton>

        {/* <Dialog.Trigger asChild>
            <S.MoreButton onClick={() => setOpen(true)}>
              <Icon.Comment css={{ color: '$point' }} />
              <span>{post.bestComments.length}개의 댓글 더 보기</span>
            </S.MoreButton>
          </Dialog.Trigger> */}

        {/* <Dialog.Portal container={drawerRef}>
            <DialogContent ref={scopee} initial={{ y: '100%' }} animate={{ y: 0 }}>
              <S.Drawer className="댓글 Drawer">
                <S.DrawerHandle className="Drawer Handle Wrapper">
                  <div className="handle" />
                </S.DrawerHandle>

                <S.DrawerBody className="Drawer Content">
                  <div className="inner">
                    <S.DrawerHead className="댓글 개수 및 필터">
                      <p className="댓글 개수">총 3개의 댓글</p>
                      <button className="필터">
                        <Icon.Sort
                          css={{
                            width: '$icon-comment',
                            height: '$icon-comment',
                            color: '$point',
                          }}
                        />
                        공감순
                      </button>
                    </S.DrawerHead>

                    <S.CommentSection className="댓글 목록">
                      <div className="댓글 컨테이너">
                        <S.Comment className="댓글 원글">
                          <S.CommentContainer className="댓글 원글 콘텐츠">
                            <div className="top">
                              <S.CommentHead className="header">
                                <div className="left">
                                  <InlineProfile
                                    type="normal"
                                    nickname="박봉자"
                                    profile="./tet.jpg"
                                  />
                                  <p className="time">4시간 전</p>
                                </div>

                                <button>
                                  <Icon.More
                                    css={{
                                      width: '$icon-comment',
                                      height: '$icon-comment',
                                    }}
                                  />
                                </button>
                              </S.CommentHead>
                              <p className="body">
                                그래 우리 재민이가 부끄러운데도 발표를 해서 친구들을 웃겨줬다니
                                기분이 좋았겠구나 아줌마는 회사에서 부장한테 웃기지도 않는 농담을
                                듣고 웃어야 해서 기분이 안 좋아요~
                              </p>
                            </div>
                            <S.CommentFoot className="footer">
                              <button>
                                <Icon.Comment
                                  css={{
                                    width: '$icon-comment',
                                    height: '$icon-comment',
                                    lineHeight: 0,
                                    color: '$point',
                                  }}
                                />
                                3
                              </button>
                              <button>
                                <Icon.Heart
                                  css={{
                                    width: '$icon-comment',
                                    height: '$icon-comment',
                                    lineHeight: 0,
                                    color: '$point',
                                  }}
                                />
                                48
                              </button>
                            </S.CommentFoot>
                          </S.CommentContainer>
                        </S.Comment>

                        <S.ReplyComment className="대댓 목록">
                          <S.Comment className="댓글 원글">
                            <S.CommentContainer className="댓글 원글 콘텐츠">
                              <div className="top">
                                <S.CommentHead className="header">
                                  <div className="left">
                                    <InlineProfile
                                      type="normal"
                                      nickname="박봉자"
                                      profile="./tet.jpg"
                                    />
                                    <p className="time">4시간 전</p>
                                  </div>

                                  <button>
                                    <Icon.More
                                      css={{
                                        width: '$icon-comment',
                                        height: '$icon-comment',
                                      }}
                                    />
                                  </button>
                                </S.CommentHead>
                                <p className="body">ㅋㅋㅋ</p>
                              </div>
                              <S.CommentFoot className="footer">
                                <button>
                                  <Icon.Heart
                                    css={{
                                      width: '$icon-comment',
                                      height: '$icon-comment',
                                      lineHeight: 0,
                                      color: '$point',
                                    }}
                                  />
                                  48
                                </button>
                              </S.CommentFoot>
                            </S.CommentContainer>
                          </S.Comment>

                          <S.Comment className="댓글 원글">
                            <S.CommentContainer className="댓글 원글 콘텐츠">
                              <div className="top">
                                <S.CommentHead className="header">
                                  <div className="left">
                                    <InlineProfile
                                      type="normal"
                                      nickname="박봉자"
                                      profile="./tet.jpg"
                                    />
                                    <p className="time">4시간 전</p>
                                  </div>

                                  <button>
                                    <Icon.More
                                      css={{
                                        width: '$icon-comment',
                                        height: '$icon-comment',
                                      }}
                                    />
                                  </button>
                                </S.CommentHead>
                                <p className="body">ㅋㅋㅋ</p>
                              </div>
                              <S.CommentFoot className="footer">
                                <button>
                                  <Icon.Heart
                                    css={{
                                      width: '$icon-comment',
                                      height: '$icon-comment',
                                      lineHeight: 0,
                                      color: '$point',
                                    }}
                                  />
                                  48
                                </button>
                              </S.CommentFoot>
                            </S.CommentContainer>
                          </S.Comment>
                        </S.ReplyComment>
                      </div>
                      <div className="댓글 컨테이너">
                        <S.Comment className="댓글 원글">
                          <S.CommentContainer className="댓글 원글 콘텐츠">
                            <div className="top">
                              <S.CommentHead className="header">
                                <div className="left">
                                  <InlineProfile
                                    type="normal"
                                    nickname="박봉자"
                                    profile="./tet.jpg"
                                  />
                                  <p className="time">4시간 전</p>
                                </div>

                                <button>
                                  <Icon.More
                                    css={{
                                      width: '$icon-comment',
                                      height: '$icon-comment',
                                    }}
                                  />
                                </button>
                              </S.CommentHead>
                              <p className="body">
                                그래 우리 재민이가 부끄러운데도 발표를 해서 친구들을 웃겨줬다니
                                기분이 좋았겠구나 아줌마는 회사에서 부장한테 웃기지도 않는 농담을
                                듣고 웃어야 해서 기분이 안 좋아요~
                              </p>
                            </div>
                            <S.CommentFoot className="footer">
                              <button>
                                <Icon.Comment
                                  css={{
                                    width: '$icon-comment',
                                    height: '$icon-comment',
                                    lineHeight: 0,
                                    color: '$point',
                                  }}
                                />
                                3
                              </button>
                              <button>
                                <Icon.Heart
                                  css={{
                                    width: '$icon-comment',
                                    height: '$icon-comment',
                                    lineHeight: 0,
                                    color: '$point',
                                  }}
                                />
                                48
                              </button>
                            </S.CommentFoot>
                          </S.CommentContainer>
                        </S.Comment>

                        <S.ReplyComment className="대댓 목록">
                          <S.Comment className="댓글 원글">
                            <S.CommentContainer className="댓글 원글 콘텐츠">
                              <div className="top">
                                <S.CommentHead className="header">
                                  <div className="left">
                                    <InlineProfile
                                      type="normal"
                                      nickname="박봉자"
                                      profile="./tet.jpg"
                                    />
                                    <p className="time">4시간 전</p>
                                  </div>

                                  <button>
                                    <Icon.More
                                      css={{
                                        width: '$icon-comment',
                                        height: '$icon-comment',
                                      }}
                                    />
                                  </button>
                                </S.CommentHead>
                                <p className="body">ㅋㅋㅋ</p>
                              </div>
                              <S.CommentFoot className="footer">
                                <button>
                                  <Icon.Heart
                                    css={{
                                      width: '$icon-comment',
                                      height: '$icon-comment',
                                      lineHeight: 0,
                                      color: '$point',
                                    }}
                                  />
                                  48
                                </button>
                              </S.CommentFoot>
                            </S.CommentContainer>
                          </S.Comment>

                          <S.Comment className="댓글 원글">
                            <S.CommentContainer className="댓글 원글 콘텐츠">
                              <div className="top">
                                <S.CommentHead className="header">
                                  <div className="left">
                                    <InlineProfile
                                      type="normal"
                                      nickname="박봉자"
                                      profile="./tet.jpg"
                                    />
                                    <p className="time">4시간 전</p>
                                  </div>

                                  <button>
                                    <Icon.More
                                      css={{
                                        width: '$icon-comment',
                                        height: '$icon-comment',
                                      }}
                                    />
                                  </button>
                                </S.CommentHead>
                                <p className="body">ㅋㅋㅋ</p>
                              </div>
                              <S.CommentFoot className="footer">
                                <button>
                                  <Icon.Heart
                                    css={{
                                      width: '$icon-comment',
                                      height: '$icon-comment',
                                      lineHeight: 0,
                                      color: '$point',
                                    }}
                                  />
                                  48
                                </button>
                              </S.CommentFoot>
                            </S.CommentContainer>
                          </S.Comment>
                        </S.ReplyComment>
                      </div>

                      <div className="댓글 더 불럴오기" />
                    </S.CommentSection>
                  </div>
                </S.DrawerBody>

                <S.DrawerFooter className="댓글 작성란">
                  <S.WriteInputBox className="입력란">
                    <S.ReplyTargetBox className="답글 정보">
                      <button className="답글 취소">
                        <Icon.Delete />
                      </button>
                      <div className="답글 정보 콘텐츠">
                        <InlineProfile nickname="박봉자" profile="./tet.jpg" type="replay-target" />
                      </div>
                    </S.ReplyTargetBox>

                    <input placeholder="칭찬을 달아주세요" />
                  </S.WriteInputBox>

                  <button class="입력 버튼">등록</button>
                </S.DrawerFooter>
              </S.Drawer>
            </DialogContent>
          </Dialog.Portal> */}
      </S.BestCommentSection>
    </S.CardContainer>
  );
};

export default ContentCard;
