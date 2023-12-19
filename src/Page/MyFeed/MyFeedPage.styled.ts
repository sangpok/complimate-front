import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';

const { space } = Tokens;

import * as Layout from '@Layouts/DefaultLayout';

export const LayoutBody = styled(Layout.Body)({
  padding: `0 ${space.double}`,
});

export const BodyInnerLayout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: space.double,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});
