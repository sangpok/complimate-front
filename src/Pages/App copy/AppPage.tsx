import { useGetPosts } from '@Hooks/index';

import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';
const { space, fontSizes, sizes, radii } = Tokens;

import * as Header from '@Components/HomeHeader';
import * as Layout from '@Layouts/DefaultLayout';
import * as Dialog from '@radix-ui/react-dialog';
import * as C from './Components';
import * as S from './AppPage.styled';
import { HorizontalLayout } from '@Layouts/HorizontalLayout';
import IconButton from '@Components/IconButton';
import {
  Hamburger as HamburgerIcon,
  Write as WriteIcon,
  Refresh as RefreshIcon,
  Heart as HeartIcon,
} from '@Icons/index';
import { PageLayout } from '@Layouts/PageLayout';
import { PaddingLayout } from '@Layouts/PaddingLayout';
import { VerticalLayout } from '@Layouts/VerticalLayout';
import { ContentCard, PostCard } from './Components/ContentCard/ContentCard';
import { useState } from 'react';

export const HeaderLayout = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const loader = (queryClient: QueryClient) => async () => {
  return null;
};

const AppHeader = () => {
  return (
    <PaddingLayout.Double>
      <HorizontalLayout.Root>
        <IconButton onClick={() => {}}>
          <HamburgerIcon />
        </IconButton>

        <HorizontalLayout.Group gap={space.default}>
          <IconButton onClick={() => {}}>
            <RefreshIcon />
          </IconButton>

          <IconButton onClick={() => {}}>
            <WriteIcon />
          </IconButton>
        </HorizontalLayout.Group>
      </HorizontalLayout.Root>
    </PaddingLayout.Double>
  );
};

const AppBody = () => {
  const lastViewId = 0;
  const { data: posts } = useGetPosts(lastViewId);
  const [currentPostIndex, setCurrentPostIndex] = useState(2);

  console.log({ currentPostIndex });

  if (!posts) {
    return;
  }

  return <PostCard post={posts[currentPostIndex]} />;
};

export const AppPage = () => {
  return <PageLayout head={<AppHeader />} body={<AppBody />} />;
};
