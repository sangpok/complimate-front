import { useState } from 'react';
import * as S from './CommentDrawer.styled';
import * as C from './CommentDrawer.component';

import * as Dialog from '@radix-ui/react-dialog';

import * as Layout from '@Layouts/DefaultLayout';

import * as Icon from '@Icons/index';
import InlineProfile from '@Components/InlineProfile';
import { CommentDrawerProp } from './CommentDrawer.types';
import { useDragControls, motion } from 'framer-motion';
import { TransitionDirection } from '../ContentCard/ContentCard.types';

const MotionedHead = motion(Layout.Head);

/**
 * TODO: HomePage에서 sortTypeIndex 관리하기
 */
export const CommentDrawer = ({
  comments,
  // sortTypeIndex,
  container,
  drawerScope,
  onCommentItemClick,
  onSortClick,
  onClose,
}: CommentDrawerProp) => {
  const dragControls = useDragControls();

  return (
    <Dialog.Portal container={container}>
      <Dialog.Content asChild>
        <S.DrawerContent
          ref={drawerScope}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          drag="y"
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(_, panInfo) => {
            const { offset, velocity } = panInfo;

            const curDirection = offset.y < 0 ? TransitionDirection.Up : TransitionDirection.Down;

            const offsetThreshold = document.body.clientHeight / 3;
            const veloctiyThreshold = 100;

            const overOffset = Math.abs(offset.y) > offsetThreshold;
            const overVelocity = Math.abs(velocity.y) > veloctiyThreshold;
            const couldTransition = overOffset || overVelocity;

            if (couldTransition && curDirection === TransitionDirection.Down) {
              onClose();
            }
          }}
        >
          <Layout.Root>
            <S.DrawerLayout>
              <MotionedHead
                // drag
                onPointerDown={(event) => {
                  console.log(event);
                  dragControls.start(event);
                }}
              >
                <S.DrawerHandle>
                  <div className="handle" />
                </S.DrawerHandle>
              </MotionedHead>

              <S.ScrollBody>
                <Layout.Head>
                  <S.DrawerHead>
                    <h2>총 {comments.length}개의 댓글</h2>
                    <button className="필터" onClick={() => onSortClick('정렬 버튼 눌렀음 암튼')}>
                      <S.SortIcon />
                      공감순
                    </button>
                  </S.DrawerHead>
                </Layout.Head>

                <C.List comments={comments} onItemClick={onCommentItemClick} />
              </S.ScrollBody>

              <Layout.Foot>
                <S.WriteContainer>
                  <S.WriteInputBox>
                    <S.ReplyTargetBox className="답글 정보">
                      <button className="답글 취소">
                        <S.DeleteIcon />
                      </button>
                      <div className="답글 정보 콘텐츠">
                        <InlineProfile nickname="박봉자" profile="./tet.jpg" type="reply-target" />
                      </div>
                    </S.ReplyTargetBox>

                    <input placeholder="칭찬을 달아주세요" />
                  </S.WriteInputBox>

                  <button className="입력 버튼">등록</button>
                </S.WriteContainer>
              </Layout.Foot>
            </S.DrawerLayout>
          </Layout.Root>
          {/* <S.Drawer className="댓글 Drawer"> */}
          {/* <S.DrawerHandle className="Drawer Handle Wrapper">
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
                              <InlineProfile type="normal" nickname="박봉자" profile="./tet.jpg" />
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
                            그래 우리 재민이가 부끄러운데도 발표를 해서 친구들을 웃겨줬다니 기분이
                            좋았겠구나 아줌마는 회사에서 부장한테 웃기지도 않는 농담을 듣고 웃어야
                            해서 기분이 안 좋아요~
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
                              <InlineProfile type="normal" nickname="박봉자" profile="./tet.jpg" />
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
                            그래 우리 재민이가 부끄러운데도 발표를 해서 친구들을 웃겨줬다니 기분이
                            좋았겠구나 아줌마는 회사에서 부장한테 웃기지도 않는 농담을 듣고 웃어야
                            해서 기분이 안 좋아요~
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
            </S.DrawerFooter> */}
          {/* </S.Drawer> */}
        </S.DrawerContent>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
