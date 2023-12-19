import styled from '@emotion/styled';
import * as Layout from '@Layouts/DefaultLayout';
import { Tokens } from '@Styles/tokens';
const { space } = Tokens;

export const LayoutBody = styled(Layout.Body)({
  padding: `0 ${space.double}`,
});

export const BodyLayout = styled.div({
  width: '100%',
  height: '100%',
  position: 'relative',
});
