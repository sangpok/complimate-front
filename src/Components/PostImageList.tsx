import React, { useEffect, useState } from 'react';

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
  const [imageWrapperRef, imageWrapperBounds] = useMeasure();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageListScope, animateImageList] = useAnimate();

  // TODO: 이미지 넘길 때 마진 계산하기
  useEffect(() => {
    animateImageList(
      imageListScope.current,
      {
        // x: `calc(-${100 * currentImageIndex}% - (${currentImageIndex} * ${space.default}))`,
        // x: `-${(imageWrapperBounds.width * currentImageIndex) / 16 + currentImageIndex * 0.75}rem`,
        x: `-${100 * currentImageIndex}%`,
      },
      { type: 'spring', bounce: 0, duration: 0.4 }
    );
  }, [currentImageIndex]);

  const handleDragEnd = (_: unknown, panInfo: PanInfo) => {
    const { offset, velocity } = panInfo;

    const curDirection = offset.x < 0 ? 1 : -1;
    const overOffset = Math.abs(offset.x) > document.body.clientWidth / 2;
    const overVelocity = Math.abs(velocity.x) > 400;
    const couldTransition = overOffset || overVelocity;

    if (couldTransition) {
      setCurrentImageIndex((prev) => wrap(0, images.length - 1, prev + curDirection));
    }
  };

  return (
    <div>
      <S.ImageWrapper>
        <DraggableComponent
          dragId="ImageList"
          axis="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          <S.ImageList ref={imageListScope} className="사진 내용">
            {images.map((image, index) => (
              <S.Image
                key={`${image}-${index}`}
                style={{
                  backgroundImage: `url('${image}')`,
                }}
              />
            ))}
          </S.ImageList>
        </DraggableComponent>
      </S.ImageWrapper>

      <S.ImageNavContainer className="사진 네비">
        {images.map((_, index) => (
          <S.Circle
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
