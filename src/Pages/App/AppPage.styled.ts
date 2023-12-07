import styled from '@emotion/styled';
import * as Layout from '@Layouts/DefaultLayout';
import { Tokens } from '@Styles/tokens';
const { space } = Tokens;

// export const PageContainer = styled.div({
//   position: 'relative',
//   display: 'flex',
//   flexDirection: 'column',
//   width: '100dvw',
//   height: '100dvh',
// });

// export const ContentSectionWrapper = styled.div({
//   flex: 1,
//   position: 'relative',
// });

export const LayoutBody = styled(Layout.Body)({
  padding: `0 ${space.double}`,
});

export const BodyLayout = styled.div({
  width: '100%',
  height: '100%',
  position: 'relative',
});
