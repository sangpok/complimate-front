import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { redirect, useNavigate, useNavigation, useSubmit } from 'react-router-dom';

import * as Layout from '@Layouts/DefaultLayout';
import * as S from './WritePage.styled';

import * as Header from '@Components/PageHeader';
import InlineProfile from '@Components/InlineProfile';

export async function action({ request }) {
  // console.log(request);
  // const formData = await request.formData();
  // console.log({ asdf: formData.get('text') });
  return await new Promise((resolve) => setTimeout(() => resolve(redirect('/home')), 1500));
}

const WritePage = () => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState('');

  const isSubmitting = navigation.state === 'submitting';

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    submit({ text: inputValue }, { method: 'post' });
  };

  const handlePrevClick = () => navigate('/home');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    resizeTextarea();
  };

  const resizeTextarea = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height =
        inputRef.current.scrollHeight > 250 ? '250px' : inputRef.current.scrollHeight + 'px';
    }
  };

  return (
    <Layout.Root>
      <Layout.Head>
        <Header.Root>
          <Header.Prev disabled={isSubmitting} onClick={handlePrevClick} />
          <Header.Title>칭찬하기 작성</Header.Title>
          <Header.Next onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? '작성중...' : '작성'}
          </Header.Next>
        </Header.Root>
      </Layout.Head>

      <Layout.Body>
        <S.Container>
          <Layout.Head>
            <InlineProfile nickname="나는야 김재민" profile="./tet.jpg" type="post" />
            <S.Time>2023.10.07 오후 4시</S.Time>
          </Layout.Head>

          <Layout.Body>
            <S.Textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleChange}
              placeholder="칭찬받고 싶은 내용을 작성해보세요 :)"
              rows={1}
              disabled={isSubmitting}
            />
            <S.TextCount>{inputValue.length}/1000</S.TextCount>
          </Layout.Body>

          <Layout.Foot>
            <S.ImageAddButton>사진 추가하기</S.ImageAddButton>
          </Layout.Foot>
        </S.Container>
      </Layout.Body>

      {/* <Layout.Foot>
        <h1>hihi</h1>
      </Layout.Foot> */}
    </Layout.Root>
  );
};

export default WritePage;
