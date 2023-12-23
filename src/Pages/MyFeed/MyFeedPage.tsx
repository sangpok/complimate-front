import { IconButton } from '@Components/IconButton';
import { useGetUserFeedData } from '@Hooks/index';
import {
  GiveHeart as GiveHeartIcon,
  Left as LeftIcon,
  TakenHeart as TakenHeartIcon,
} from '@Icons/index';
import { HorizontalLayout } from '@Layouts/HorizontalLayout';
import { PaddingLayout } from '@Layouts/PaddingLayout';
import { PageLayout } from '@Layouts/PageLayout';
import { VerticalLayout } from '@Layouts/VerticalLayout';
import { Tokens } from '@Styles/tokens';
import { CompCount, MyComment, MyCompliment, UserAuth } from '@Types/index';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { FeedTab } from './FeedTab';
const { space, fontSizes, sizes, radii } = Tokens;

type FeedHeadProp = UserAuth & CompCount;
const FeedHead = ({ nickname, profileUrl, writeCompCount, receiveCompCount }: FeedHeadProp) => {
  const navigate = useNavigate();

  return (
    <>
      <PaddingLayout.Double wFull>
        <HorizontalLayout.Root>
          <HorizontalLayout.Group gap={space.default}>
            <IconButton onClick={() => navigate('/app', { replace: true })}>
              <LeftIcon />
            </IconButton>

            <HeadTitle>내 피드</HeadTitle>
          </HorizontalLayout.Group>
        </HorizontalLayout.Root>
      </PaddingLayout.Double>

      <PaddingLayout.SideDouble wFull>
        <ProfileBox>
          <VerticalLayout gap={space.default}>
            <HorizontalLayout.Root>
              <HorizontalLayout.Group gap={space.default}>
                <ProfileImage url={`/profile/${profileUrl}`} />

                <VerticalLayout>
                  <Nickname>{nickname}</Nickname>
                  <HandleId>@im_jmjm</HandleId>
                </VerticalLayout>
              </HorizontalLayout.Group>
            </HorizontalLayout.Root>

            <FillWithPoint>
              <HorizontalLayout.Group gap={space.default}>
                <StyledGiveHeartIcon />

                <VerticalLayout>
                  <CategoryName>내가 쓴 칭찬</CategoryName>
                  <Counter>{writeCompCount}개</Counter>
                </VerticalLayout>
              </HorizontalLayout.Group>

              <HorizontalLayout.Group gap={space.default}>
                <StyledTakenHeartIcon />

                <VerticalLayout>
                  <CategoryName>내가 받은 칭찬</CategoryName>
                  <Counter>{receiveCompCount}개</Counter>
                </VerticalLayout>
              </HorizontalLayout.Group>
            </FillWithPoint>
          </VerticalLayout>
        </ProfileBox>
      </PaddingLayout.SideDouble>
    </>
  );
};

type FeedBodyProp = {
  compliments: MyCompliment[];
  comments: MyComment[];
};

const FeedBody = ({ compliments, comments }: FeedBodyProp) => {
  return <FeedTab compliments={compliments} comments={comments} />;
};

export const MyFeedPage = () => {
  const [meQuery, compCountQuery, complimentsQuery, commentsQuery] = useGetUserFeedData();

  const isLoading =
    meQuery.isPending ||
    compCountQuery.isPending ||
    complimentsQuery.isPending ||
    commentsQuery.isPending;

  if (isLoading) {
    return;
  }

  const { data: userAuth } = meQuery;
  const { data: compCount } = compCountQuery;
  const { data: compliments } = complimentsQuery;
  const { data: comments } = commentsQuery;

  console.log({ userAuth, compCount });

  const isLoaded = userAuth && compCount && compliments && comments;

  return (
    isLoaded && (
      <PageLayout
        head={<FeedHead {...userAuth} {...compCount} />}
        body={<FeedBody compliments={compliments} comments={comments} />}
      />
    )
  );
};

export const HeadTitle = styled.p({
  ...fontSizes.menu,
  fontWeight: '600',
});

export const ProfileImage = styled.div<{ url?: string }>(
  {
    ...radii.full,
    display: 'inline-block',
    width: sizes.profile.medium,
    height: sizes.profile.medium,
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

export const ProfileBox = styled(PaddingLayout.Default)(
  {
    ...radii.small,
  },
  ({ theme }) => ({
    border: `${theme.borderWidths.base._1} solid ${theme.colors.border.point}`,
  })
);

export const Nickname = styled.p({ width: '100%', fontWeight: 600 });

export const HandleId = styled.p({ width: '100%' }, ({ theme }) => ({
  color: theme.colors.text.greyed,
}));

export const FillWithPoint = styled(HorizontalLayout.Root)({}, ({ theme }) => ({
  color: theme.colors.text.point,
}));

export const StyledGiveHeartIcon = styled(GiveHeartIcon)({
  width: sizes.icon.feedProfile,
  height: sizes.icon.feedProfile,
});

export const StyledTakenHeartIcon = styled(TakenHeartIcon)({
  width: sizes.icon.feedProfile,
  height: sizes.icon.feedProfile,
});

export const CategoryName = styled.p({
  ...fontSizes.default,
  fontWeight: 600,
});

export const Counter = styled.p({
  ...fontSizes.large,
  fontWeight: 600,
  width: '100%',
});
