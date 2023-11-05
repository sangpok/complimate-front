import { styled } from '@/stitches.config';
import * as Form from '@radix-ui/react-form';

export const LoginBody = styled('div', {
  padding: '$double',
  paddingTop: 0,
});

export const FormField = styled(Form.Field, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$default',
  padding: '0 $default',
});

export const FormMessage = styled(Form.Message, {
  color: '$red',
  fontSize: '$label-status',
  fontWeight: 500,
});
