/** React */
import { useNavigate } from 'react-router-dom';

/** Style & Component */
import * as Header from '@Components/PageHeader';
import * as Layout from '@Layouts/DefaultLayout';
import * as S from './SettingPage.styled';
import * as C from './SettingPage.component';

/** In-app data */
import { settingList } from './SettingPage.list';

const SettingPage = () => {
  const navigate = useNavigate();

  const handlePrevClick = () => {
    navigate('/home');
  };

  const handleItemClick = (path: string) => {
    navigate(path);
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

export default SettingPage;
