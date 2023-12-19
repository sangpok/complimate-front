/** React */
import React, { useCallback, useRef, useState } from 'react';

/** Style */
import * as Layout from '@Layouts/DefaultLayout';
import * as S from './ContentCard.styled';

/** Component */
import PostUserInfo from '@Components/PostUserInfo';
import * as C from './Components';

/** Icon */

/** Animate */
import { useAnimate } from 'framer-motion';

/** Hook */

/** Type */
import { useDoubleTap } from '@Hooks/useDoubleTab';
import { ContentCardProp } from './ContentCard.types';

const ContentCard = React.memo(({ post, onCommentClick, onHeartClick }: ContentCardProp) => {
  const [heartRef, animateHeart] = useAnimate();

  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const cardBodyParentRef = useRef<HTMLDivElement>(null);

  const handleHeartClick = useCallback(() => {
    setIsHeartClicked((prev) => !prev);
    onHeartClick(post.id);
  }, [post]);

  const animateHeartDown = useCallback(() => animateHeart(heartRef.current, { scale: 0.7 }), []);
  const animateHeartUp = useCallback(async () => {
    await animateHeart(heartRef.current, { scale: 1.2 });
    await animateHeart(heartRef.current, { scale: 1 });
  }, []);

  const animateHeartbeat = useCallback(async () => {
    await animateHeartDown();
    await animateHeartUp();
  }, []);

  const doubleTabEvent = useDoubleTap(
    useCallback(() => {
      setIsHeartClicked((prev) => !prev);
      onHeartClick(post.id);
      animateHeartbeat();
    }, [post])
  );

  return (
    <S.CardContainer>
      <S.CardHedaer>
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

      <Layout.Body {...doubleTabEvent}>
        <S.CardBodyLayout ref={cardBodyParentRef}>
          {/* <CardBody parentRef={cardBodyParentRef}> */}
          <C.ContentBody parentRef={cardBodyParentRef} post={post} />
        </S.CardBodyLayout>
      </Layout.Body>

      <Layout.Foot>
        <C.BestCommentList bestComments={post.bestComments} onMoreClick={() => onCommentClick()} />
      </Layout.Foot>
    </S.CardContainer>
    // <S.CardContainer
    //   key={JSON.stringify(bodyBounds)}
    //   // drag="y"
    //   // dragConstraints={{ top: 0, bottom: 0 }}
    //   // dragListener={false}
    //   // dragControls={containerDragControls}
    //   // dragDirectionLock
    //   // onPointerDown={handleContainerPointerDown}
    //   // onDragEnd={handleContainerDragEnd}
    //   className="칭찬해줘 한 개"
    // >
    //   <S.CardHedaer className="유저 정보 및 칭찬스티커">
    //     <PostUserInfo
    //       date={`${post.date}`}
    //       nickname={`${post.author}`}
    //       profile={`${post.profile}`}
    //     />

    //     <C.StickerButton
    //       onClick={handleHeartClick}
    //       onPointerDown={() => animateHeartDown()}
    //       onPointerUp={() => animateHeartUp()}
    //       heartRef={heartRef}
    //       isHeartClicked={isHeartClicked}
    //       stickerCount={post.stickerCount}
    //     />
    //   </S.CardHedaer>

    //   <S.CardBody
    //     data-component="body"
    //     className="칭찬해줘"
    //     ref={mergeRefs([cardBodyRef, bodyRef])}
    //     {...doubleTabEvent}
    //   >
    //     <motion.div
    //       key={JSON.stringify(bodyBounds)}
    //       ref={bodyContentRef}
    //       style={{ y }}
    //       drag="y"
    //       dragListener={false}
    //       dragDirectionLock
    //       dragElastic={false}
    //       // dragConstraints={cardBodyRef}
    //       dragConstraints={
    //         isOverflow && {
    //           top: -(bodyContentBounds.height - bodyBounds.height),
    //           bottom: 0,
    //         }
    //       }
    //       dragControls={bodyDragControls}
    //       onPointerDown={handleBodyPointerDown}
    //       onPointerUp={handleBodyPointerUp}
    //       onPointerMove={handleBodyPointerMove}
    //     >
    //       {post.images.length !== 0 && <PostImageList images={post.images} />}

    //       {/* 칭찬해줘 본문 */}
    //       <div className="cc-body-text">
    //         <p data-component="body">{post.body}</p>
    //       </div>
    //     </motion.div>
    //   </S.CardBody>

    //   <C.BestCommentList bestComments={post.bestComments} onMoreClick={() => onCommentClick()} />
    // </S.CardContainer>
  );
});

export default ContentCard;
