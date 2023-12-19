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
  );
});

export default ContentCard;
