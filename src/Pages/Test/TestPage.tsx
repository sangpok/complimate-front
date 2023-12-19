import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Variants, motion } from 'framer-motion';

import { IconButton } from '@Components/IconButton';
import { Heart as HeartIcon } from '@Icons/index';

import styled from '@emotion/styled';

const likeList = [
  {
    id: 0,
    likeType: 'LIKE',
    likeCount: 1,
    isLiked: true,
  },
  {
    id: 1,
    likeType: 'PRAY',
    likeCount: 0,
    isLiked: false,
  },
  {
    id: 2,
    likeType: 'LAUGH_WITH_SAD',
    likeCount: 0,
    isLiked: false,
  },
  {
    id: 3,
    likeType: 'HEART_EYES',
    likeCount: 0,
    isLiked: false,
  },
  {
    id: 4,
    likeType: 'ANGEL_SMILE',
    likeCount: 0,
    isLiked: false,
  },
] as PostLike[];

const totalLikeCount = 1;

import { Tokens } from '@Styles/tokens';
import { LikeButtonWithList } from '@Pages/App/LikeButtonWithList';
import { PostLike } from '@Types/index';
const { radii } = Tokens;

export const TestPage = () => {
  const [tmpLikeList, setTmpLikeList] = useState(likeList);
  const [totalLikeCount, setTotalLikeCount] = useState(
    likeList.reduce((acc, { likeCount }) => acc + likeCount, 0)
  );

  console.log({ tmpLikeList });
  return (
    <div>
      <Link to="/" replace>
        Back to Landing
      </Link>

      <div style={{ display: 'grid', placeContent: 'center', height: '100dvh' }}>
        <LikeButtonWithList
          likeCount={totalLikeCount}
          likeList={tmpLikeList.sort((a, b) => a.id - b.id)}
          onSelectLike={(prevLike, newLike) => {
            if (prevLike) {
              if (prevLike.likeType === newLike.likeType) {
                // 좋아요 취소임!
                setTmpLikeList([
                  ...tmpLikeList.filter(({ likeType: lt }) => lt !== newLike.likeType),
                  {
                    ...newLike,
                    isLiked: false,
                    likeCount: newLike.likeCount - 1,
                  },
                ]);

                setTotalLikeCount(totalLikeCount - 1);
              } else {
                // 좋아요 교체임
                setTmpLikeList([
                  ...tmpLikeList.filter(
                    ({ likeType: lt }) => !(lt === newLike.likeType || lt === prevLike.likeType)
                  ),
                  {
                    ...prevLike,
                    isLiked: false,
                    likeCount: prevLike.likeCount - 1,
                  },
                  {
                    ...newLike,
                    isLiked: true,
                    likeCount: newLike.likeCount + 1,
                  },
                ]);
              }
            } else {
              // 처음 Like
              setTmpLikeList([
                ...tmpLikeList.filter(({ likeType: lt }) => lt !== newLike.likeType),
                {
                  ...newLike,
                  isLiked: true,
                  likeCount: newLike.likeCount + 1,
                },
              ]);
              setTotalLikeCount(totalLikeCount + 1);
            }
          }}
        />
      </div>
    </div>
  );
};
