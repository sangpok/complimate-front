import { PageLayout } from '@Layouts/PageLayout';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { WriteHeader } from './WriteHeader';

import * as S from './WritePage.styled';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { CreatePostRequest, MediaUrl, UserAuth, Writer } from '@Types/index';
import { PaddingLayout } from '@Layouts/PaddingLayout';

import { Tokens } from '@Styles/tokens';
import { useCreatePost } from '@Hooks/index';
import { useQueryClient } from '@tanstack/react-query';
const { space } = Tokens;

type WrtierPresenterProp = {
  writer: Writer;
  createdAt: number;
};

const PostMetaInfo = ({ writer, createdAt }: WrtierPresenterProp) => {
  const { profileUrl, nickname } = writer;

  return (
    <S.WriterLayout>
      <div className="writer">
        <S.SmallCircleProfile url={`/profile/${profileUrl}`} />
        <span className="nickname">
          <strong>{nickname}</strong>
          님으로부터
        </span>
      </div>

      <p className="time">{new Date(+createdAt).toLocaleString()}</p>
    </S.WriterLayout>
  );
};

const WriteBody = ({ error }: { error: Error | null }) => {
  const userAuth = useRouteLoaderData('appLayout') as Omit<UserAuth, 'password'>;
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
    <PaddingLayout.SideDouble style={{ marginBottom: space.double }}>
      <PostMetaInfo writer={userAuth} createdAt={Number(new Date())} />
      <S.Textarea
        name="contents"
        ref={inputRef}
        onChange={handleChange}
        placeholder="칭찬받고 싶은 내용을 작성해보세요 :)"
        rows={1}
      />
      <S.TextCount>{inputRef.current?.value.length || 0}/1000</S.TextCount>

      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </PaddingLayout.SideDouble>
  );
};

const WriteFooter = () => {
  return (
    <>
      <PaddingLayout.SideDouble wFull>
        <S.ImageAddButton type="button">사진 추가하기</S.ImageAddButton>
      </PaddingLayout.SideDouble>

      <input name="media-1" defaultValue="1.webp" hidden />
      <input name="media-2" defaultValue="2.webp" hidden />
      <input name="media-3" defaultValue="3.webp" hidden />
      <input name="media-4" defaultValue="4.webp" hidden />
      <input name="media-5" defaultValue="5.webp" hidden />
      <input name="media-6" defaultValue="6.webp" hidden />
      <input name="media-7" defaultValue="7.webp" hidden />
    </>
  );
};

export const WritePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useCreatePost();
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const hasMedia = formData.has('media-1');
    const mediaUrlList: MediaUrl[] = [];

    if (hasMedia) {
      formData.forEach((value, key) => {
        if (key.includes('media-')) {
          mediaUrlList.push({
            mediaUrl: value as string,
            mediaType: 'IMAGE',
          });
        }
      });
    }

    const postData = { ...Object.fromEntries(formData), mediaUrlList } as CreatePostRequest;
    // console.log({ postData });
    mutate(postData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        navigate('/app', { replace: true });
      },
      onError: (error) => setError(error),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={isPending}>
        <PageLayout
          head={<WriteHeader />}
          body={<WriteBody error={error} />}
          foot={<WriteFooter />}
        />
      </fieldset>
    </form>
  );
};
