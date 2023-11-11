import DraggableComponent from '@Components/DraggableComponent';
import React, { useRef } from 'react';

import * as S from './ContentBody.styled';
import PostImageList from '@Components/PostImageList';

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

const ContentBody = React.memo(({ parentRef, post }) => {
  return (
    <DraggableComponent
      dragId="ContentBody"
      axis="y"
      dragConstraints={parentRef}
      // onDragEnd={handleDragEnd}
    >
      {post.images.length !== 0 && (
        <S.ImageListSection>
          <S.ImageListSectionLayout>
            <PostImageList images={post.images} />
          </S.ImageListSectionLayout>
        </S.ImageListSection>
      )}

      <S.BodyContent>
        <p>{post.body}</p>
      </S.BodyContent>
    </DraggableComponent>
  );
});

export default ContentBody;
