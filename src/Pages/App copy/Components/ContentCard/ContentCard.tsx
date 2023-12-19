import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
const { space, fontSizes, sizes, radii } = Tokens;

import { HorizontalLayout } from '@Layouts/HorizontalLayout';
import { PaddingLayout } from '@Layouts/PaddingLayout';
import React from 'react';
import IconButton from '@Components/IconButton';
import { Heart as HeartIcon } from '@Icons/index';
import { ComplementPost, Writer } from '@Types/index';
import { VerticalLayout } from '@Layouts/VerticalLayout';
import { PageLayout } from '@Layouts/PageLayout';

const SmallCircleProfile = styled.div<{ url?: string }>(
  {
    ...radii.full,
    display: 'inline-block',
    width: sizes.profile.small,
    height: sizes.profile.small,
    overflow: 'hidden',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  ({ url }) => {
    if (url) {
      return { backgroundImage: `url('${url}')` };
    }
  }
);

const WriterLayout = styled.div(
  {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    '& p.time': {
      ...fontSizes.post.time,
    },

    '& div.writer': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: space.smaller,
    },
  },
  ({ theme }) => ({
    color: theme.colors.text.greyed,
  })
);

const HeartButtonContainer = styled.div(
  {
    'p.count': {
      ...fontSizes.button.sm,
      fontWeight: '600',
      textAlign: 'center',
    },
  },
  ({ theme }) => ({
    color: theme.colors.text.point,
  })
);

const HeartButton = () => {
  return (
    <HeartButtonContainer>
      <IconButton>
        <HeartIcon />
      </IconButton>

      <p className="count">10</p>
    </HeartButtonContainer>
  );
};

type WrtierPresenterProp = {
  writer: Writer;
  createdAt: number;
};

const PostMetaInfo = ({ writer, createdAt }: WrtierPresenterProp) => {
  const { profileUrl, nickname } = writer;

  return (
    <WriterLayout>
      <div className="writer">
        <SmallCircleProfile url={`./profile/${profileUrl}`} />
        <span className="nickname">
          <strong>{nickname}</strong>
          님으로부터
        </span>
      </div>

      <p className="time">{new Date(+createdAt).toLocaleString()}</p>
    </WriterLayout>
  );
};

type PostCard = {
  post: ComplementPost;
};

export const PostCard = ({ post }: PostCard) => {
  return (
    <PaddingLayout.SideDouble>
      <PageLayout
        head={
          <HorizontalLayout.Root>
            <PostMetaInfo {...post} />
            <HeartButton />
          </HorizontalLayout.Root>
        }
        body={<div className="본문">sdf</div>}
        foot={<div className="베댓">sdf</div>}
      />
    </PaddingLayout.SideDouble>
  );
};
