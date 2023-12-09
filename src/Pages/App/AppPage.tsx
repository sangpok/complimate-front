import { useGetPosts } from '@Hooks/index';

import * as Header from '@Components/HomeHeader';
import * as Layout from '@Layouts/DefaultLayout';
import * as Dialog from '@radix-ui/react-dialog';
import * as C from './Components';
import * as S from './AppPage.styled';

export const loader = (queryClient: QueryClient) => async () => {
  return null;
};

const AppHeader = () => {
  return (
    <Header.Root>
      <Header.Hamburger onClick={() => {}} />
      <Header.Group>
        <Header.Refresh onClick={() => {}} />
        <Header.Write onClick={() => {}} />
      </Header.Group>
    </Header.Root>
  );
};

export const AppPage = () => {
  const lastViewId = 0;
  const { data: posts } = useGetPosts(lastViewId);

  return (
    <Layout.Root>
      <Layout.Head>
        <AppHeader />
      </Layout.Head>

      <S.LayoutBody>
        <S.BodyLayout>
          {/* <C.DraggablePost
            post={posts[currentPostIndex]}
            onTransitionRaise={handleTransitionRaise}
            onCommentClick={handleCommentClick}
            onHeartClick={handleHaertClick}
          /> */}
        </S.BodyLayout>
      </S.LayoutBody>
    </Layout.Root>
  );
};
