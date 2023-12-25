import React, { useEffect, useMemo, useState } from 'react';

import { PanInfo, useAnimate } from 'framer-motion';
import useMeasure from 'react-use-measure';
import * as S from './PostImageList.styled';
import { PostImageList } from './PostImageList.types';
import { Tokens } from '@Styles/tokens';
import DraggableComponent from './DraggableComponent';
const { space } = Tokens;

const wrap = (min: number, max: number, value: number) => {
  if (value < min) return min;
  if (value > max) return max;

  return value;
};

const PostImageList = React.memo(({ images }: PostImageList) => {
  const [viewportRef, viewportBounds] = useMeasure();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageListScope, animateImageList] = useAnimate();

  // 이미지랑 이미지 간극을 알아야 해 !!!! -> .75rem
  // 원래라면 12px이겠지만.. 기준 root font size가 calc(100vw / 22.5)야
  const rootFontSize = useMemo(
    () => parseFloat(getComputedStyle(document.querySelector(':root') as Element).fontSize),
    []
  );
  const gap = useMemo(() => 0.75 * rootFontSize, []); // 실제 px
  const viewportWidth = useMemo(() => viewportBounds.width, [viewportBounds.width]);
  const gapVW = useMemo(() => (gap / viewportWidth) * 100, [gap, viewportWidth]);

  const postImageWidth = useMemo(
    () => ((100 + gapVW) * viewportWidth) / 100,
    [gapVW, viewportWidth]
  ); // 100(vw) + 3.33(vw)

  console.log({ viewportWidth, postImageWidth });

  const handleDragEnd = (_: unknown, panInfo: PanInfo) => {
    const { offset, velocity } = panInfo;

    const curDirection = offset.x < 0 ? 1 : -1;
    const overOffset = Math.abs(offset.x) > document.body.clientWidth / 2;
    const overVelocity = Math.abs(velocity.x) > 50;
    const couldTransition = overOffset || overVelocity;

    if (couldTransition) {
      setCurrentImageIndex((prev) => wrap(0, images.length - 1, prev + curDirection));
    }
  };

  return (
    <div style={{ width: '100%' }} ref={viewportRef}>
      <S.ImageWrapper>
        <DraggableComponent
          dragId="ImageList"
          axis="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          <S.ImageList animate={{ x: -currentImageIndex * postImageWidth }} className="사진 내용">
            {images.map((image, index) => (
              <S.Image
                key={`${image}-${index}`}
                style={{
                  backgroundImage: `url('/${image.mediaUrl}')`,
                }}
              />
            ))}
          </S.ImageList>
        </DraggableComponent>
      </S.ImageWrapper>

      <S.ImageNavContainer className="사진 네비">
        {images.map((_, index) => (
          <S.Circle
            onClick={() => setCurrentImageIndex(index)}
            key={`post-image-${index}`}
            className={index === currentImageIndex ? 'selected' : ''}
          />
        ))}
      </S.ImageNavContainer>
    </div>

    // <S.Container className="사진 섹션">
    //   <S.ImageWrapper
    //     ref={imageWrapperRef}
    //     drag="x"
    //     dragConstraints={{ left: 0, right: 0 }}
    //     dragDirectionLock
    //     dragElastic={0.2}
    //     onDragEnd={handleDragEnd}
    //     className="사진 컨테이너"
    //   >
    //     <S.ImageList ref={imageListScope} className="사진 내용">
    //       {images.map((image, index) => (
    //         <S.Image
    //           key={`${image}-${index}`}
    //           style={{
    //             backgroundImage: `url('${image}')`,
    //           }}
    //         />
    //       ))}
    //     </S.ImageList>
    //   </S.ImageWrapper>

    //   <S.ImageNavContainer className="사진 네비">
    //     {images.map((_, index) => (
    //       <S.Circle
    //         key={`post-image-${index}`}
    //         className={index === currentImageIndex ? 'selected' : ''}
    //       />
    //     ))}
    //   </S.ImageNavContainer>
    // </S.Container>
  );
});

export default PostImageList;
