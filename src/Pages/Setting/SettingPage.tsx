/** React */
import { useNavigate } from 'react-router-dom';

/** Style & Component */
import * as Header from '@Components/PageHeader';
import * as Layout from '@Layouts/DefaultLayout';
import * as S from './SettingPage.styled';
import * as C from './SettingPage.component';

/** In-app data */
import { settingList } from './SettingPage.list';

export const SettingPage = () => {
  const navigate = useNavigate();

  const handlePrevClick = () => {
    navigate('/app');
  };

  const handleItemClick = (path: string) => {
    if (path === '/logout') {
      navigate('/');
    } else {
      alert(path);
    }
  };

  const settingListComponents = settingList.map((setting, index) => (
    <C.CategoryList key={`setting-group-${index}`} group={setting} onItemClick={handleItemClick} />
  ));

  return (
    <Layout.Root>
      <Layout.Head>
        <Header.Root>
          <Header.Prev onClick={handlePrevClick} />
          <Header.Title>설정</Header.Title>
        </Header.Root>
      </Layout.Head>

      <Layout.Body>
        <S.ListGroup>{settingListComponents}</S.ListGroup>
      </Layout.Body>
    </Layout.Root>
  );
};
