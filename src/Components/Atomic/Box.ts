import styled from '@emotion/styled';
import { token } from '@Styles/theme';

export const Box = styled.div`
  display: flex;
  flexdirection: column;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.body};
  width: '100%';
  gap: ${({ theme }) => theme.space.default};
  ${token.space.default}
`;
