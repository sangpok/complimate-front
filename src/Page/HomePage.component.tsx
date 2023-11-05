import * as Icon from '@Icons/index';
import * as Layout from '@Layouts/DefaultLayout';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, useAnimate } from 'framer-motion';
import * as S from './HomePage.styled';

import {
  MenuHeadProp,
  MenuIconProp,
  MenuItem,
  MenuItemProp,
  MenuListProp,
  SideBarMenuProp,
} from './HomePage.types';

import { TransitionDirection } from '@Components/ContentCard.types';
import { useEffect, useRef, useState } from 'react';
import ContentCard from '@Components/ContentCard';
import InlineProfile from '@Components/InlineProfile';

const sidebarMenuList: MenuItem[] = [
  {
    name: '홈',
    icon: Icon.Home,
    path: '/home',
    enabled: true,
  },
  {
    name: '내 피드',
    icon: Icon.Profile,
    path: '/profile',
    enabled: true,
  },
  {
    name: '명예의 전당',
    icon: Icon.Hamburger,
    path: '/cool',
    enabled: false,
  },
  {
    name: '추가 기능',
    icon: Icon.Hamburger,
    path: '/addon',
    enabled: false,
  },
];

const MiniLogo = () => (
  <S.MenuFooter>
    <Icon.Logo
      css={{
        width: '$icon-sm',
        height: '$icon-sm',
      }}
    />
    <span>컴플리메이트</span>
  </S.MenuFooter>
);

const MenuIcon = ({ IconInner, ...rest }: MenuIconProp) => {
  return (
    <IconInner
      css={{
        width: '$icon-menu',
        height: '$icon-menu',
        color: '$body',
        ...rest,
      }}
    />
  );
};

const Head = ({ onBackClick, onSettingClick }: MenuHeadProp) => {
  return (
    <S.SideBarHeader>
      <div className="group">
        <button onClick={onBackClick}>
          <MenuIcon IconInner={Icon.Left} />
        </button>
        <p>메뉴</p>
      </div>

      <button onClick={onSettingClick}>
        <Icon.Setting />
      </button>
    </S.SideBarHeader>
  );
};

const Item = ({ selected, item, onClick }: MenuItemProp) => {
  return (
    <li
      className={!item.enabled ? 'disabled' : selected ? 'selected' : ''}
      onClick={() => item.enabled && onClick(item.path)}
    >
      <MenuIcon
        IconInner={item.icon}
        color={!item.enabled ? '$depth3' : selected ? '$point' : ''}
      />
      {item.name}
    </li>
  );
};

const List = ({ list, currentPath, onMenuItemClick }: MenuListProp) => {
  return (
    <S.MenuList>
      {list.map((item) => (
        <Item
          key={item.path}
          selected={currentPath === item.path}
          item={item}
          onClick={onMenuItemClick}
        />
      ))}
    </S.MenuList>
  );
};

const SideMenu = { Head, List };

export const SideBarMenu = ({
  container,
  onBackClick,
  onSettingClick,
  onMenuItemClick,
  overlayScope,
  contentScope,
}: SideBarMenuProp) => {
  return (
    <Dialog.Portal container={container.current}>
      <S.DialogOverlay ref={overlayScope} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <S.DialogContent ref={contentScope} initial={{ x: '-100%' }} animate={{ x: 0 }}>
          <S.MenuInner>
            <Layout.Head>
              <SideMenu.Head onBackClick={onBackClick} onSettingClick={onSettingClick} />
            </Layout.Head>

            <Layout.Body>
              <SideMenu.List
                list={sidebarMenuList}
                currentPath="/home"
                onMenuItemClick={onMenuItemClick}
              />
            </Layout.Body>

            <Layout.Foot>
              <MiniLogo />
            </Layout.Foot>
          </S.MenuInner>
        </S.DialogContent>
      </S.DialogOverlay>
    </Dialog.Portal>
  );
};

const contentSectionVariants = {
  before: (direction: number) => ({ y: `${100 * direction}%` }),
  normal: { y: 0 },
  exit: (direction: number) => ({ y: `${-100 * direction}%` }),
};

export const DraggablePost = ({ post, onTransitionRaise, drawerRef, onCommentClick }) => {
  const direction = useRef(TransitionDirection.Down);

  const handleTransitionRaise = (newDirection: TransitionDirection) => {
    direction.current = newDirection;
    onTransitionRaise(newDirection);
  };

  return (
    <AnimatePresence custom={direction.current} initial={false}>
      <S.ContentSection
        key={post.id}
        custom={direction.current}
        variants={contentSectionVariants}
        initial="before"
        animate="normal"
        exit="exit"
      >
        <ContentCard
          post={post}
          onTransitionRaise={handleTransitionRaise}
          drawerRef={drawerRef}
          onCommentClick={onCommentClick}
        />
      </S.ContentSection>
    </AnimatePresence>
  );
};

const CommentItemInner = ({ name, profile, date, body, replys, heartCount }) => {
  return (
    <div>
      <Layout.Head>
        <div className="left">
          <InlineProfile type="normal" nickname={name} profile={profile} />
          <p className="time">{date}</p>
        </div>

        <button>
          <Icon.More
            css={{
              width: '$icon-comment',
              height: '$icon-comment',
            }}
          />
        </button>
      </Layout.Head>

      <Layout.Body>
        <p className="body">{body}</p>
      </Layout.Body>

      <Layout.Foot>
        {replys && (
          <button>
            <Icon.Comment
              css={{
                width: '$icon-comment',
                height: '$icon-comment',
                lineHeight: 0,
                color: '$point',
              }}
            />
            {replys.length}
          </button>
        )}
        <button>
          <Icon.Heart
            css={{
              width: '$icon-comment',
              height: '$icon-comment',
              lineHeight: 0,
              color: '$point',
            }}
          />
          {heartCount}
        </button>
      </Layout.Foot>
    </div>
  );
};

const CommentItem = ({ comment }) => {
  return (
    <div>
      <CommentItemInner {...comment} />
      {comment.replys.length !== 0 && (
        <div className="padding">
          {comment.replys.map((reply) => (
            <CommentItemInner {...reply} />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentList = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export const CommentDrawer = ({ comments, container, drawerScope }) => {
  return (
    <Dialog.Portal container={container}>
      <S.DrawerContent ref={drawerScope} initial={{ y: '100%' }} animate={{ y: 0 }}>
        <Layout.Root>
          <S.DrawerLayout>
            <Layout.Head>
              <S.DrawerHandle>
                <div className="handle" />
              </S.DrawerHandle>
            </Layout.Head>

            <Layout.Body css={{ overflowY: 'scroll' }}>
              <Layout.Head>
                <div>
                  <h2>총 {comments.length}개의 댓글</h2>
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
                </div>
              </Layout.Head>

              <CommentList comments={comments} />
            </Layout.Body>

            <Layout.Foot>
              <S.WriteContainer>
                <S.WriteInputBox>
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
    </Dialog.Portal>
  );
};
