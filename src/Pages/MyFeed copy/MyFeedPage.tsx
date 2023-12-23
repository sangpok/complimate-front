import * as S from './MyFeedPage.styled';

import * as Header from '@Components/PageHeader';
import * as Layout from '@Layouts/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import * as C from './Components';

const tabs = [
  {
    name: '내가 쓴 칭찬해줘',
    list: [
      {
        id: uuid(),
        content: '떡볶이 먹고 싶었는데 다욧중이라 참음',
        commentCount: 25,
        heartCount: 51,
      },
      {
        id: uuid(),
        content: '저가요 오늘요 무슨일이잇엇냐면요 맨날 부끄러워서ㅋㅋ',
        commentCount: 18,
        heartCount: 46,
      },
    ],
  },
  {
    name: '내가 쓴 칭찬할게',
    list: [
      {
        id: uuid(),
        content: '돼지에서 벗어난 거 축하해~',
        commentCount: null,
        heartCount: 109,
      },
      {
        id: uuid(),
        content:
          '그래 우리 재민이가 부끄러운데도 발표를 해서 친구들을 웃겨줬다니 기분이 좋았겠꾸나 아줌마는 회사에서 부장한테 웃기지도 않는 농담을 듣고 웃어야 해서 기분이 안 좋아요~',
        commentCount: null,
        heartCount: 75,
      },
    ],
  },
];

export const MyFeedPage = () => {
  const navigate = useNavigate();

  const handlePrevClick = () => {
    navigate('/app');
  };

  return (
    <Layout.Root>
      <Layout.Head>
        <Header.Root>
          <Header.Prev onClick={handlePrevClick} />
          <Header.Title>내 피드</Header.Title>
        </Header.Root>
      </Layout.Head>

      <S.LayoutBody>
        <S.BodyInnerLayout>
          {/* <S.ListGroup>{settingListComponents}</S.ListGroup> */}
          <C.FeedInfo />

          <C.TabList tabs={tabs} />
        </S.BodyInnerLayout>
      </S.LayoutBody>
    </Layout.Root>
  );
};
