import styled from '@emotion/styled';
import * as Form from '@radix-ui/react-form';
import { Tokens } from '@Styles/tokens';
const { space, fontSizes, colors } = Tokens;

export const LoginBody = styled.div({
  padding: space.double,
  paddingTop: 0,
});

export const FormField = styled(Form.Field)({
  display: 'flex',
  flexDirection: 'column',
  gap: space.default,
  padding: `0 ${space.default}`,
});

export const FormMessage = styled(Form.Message)({
  color: colors.base.red,
  // fontSize: '$label-status',
  ...fontSizes['label-status'],
  fontWeight: 500,
});
