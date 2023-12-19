import { HorizontalLayout } from '@Layouts/HorizontalLayout';
import { PaddingLayout } from '@Layouts/PaddingLayout';

import { IconButton } from '@Components/IconButton';

import { Left as LeftIcon } from '@Icons/index';

import { TextButton } from '@Components/TextButton';
import { Tokens } from '@Styles/tokens';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
const { space, fontSizes } = Tokens;

export const WriteTitle = styled.p({
  ...fontSizes.menu,
  fontWeight: '600',
});

export const WriteHeader = () => {
  const navigate = useNavigate();

  return (
    <PaddingLayout.Double wFull>
      <HorizontalLayout.Root>
        <HorizontalLayout.Group gap={space.default}>
          <IconButton onClick={() => navigate('/app', { replace: true })}>
            <LeftIcon />
          </IconButton>

          <WriteTitle>작성하기</WriteTitle>
        </HorizontalLayout.Group>

        <TextButton type="submit">작성</TextButton>
      </HorizontalLayout.Root>
    </PaddingLayout.Double>
  );
};
