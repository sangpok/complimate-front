import { styled } from '@/stitches.config';
import { motion } from 'framer-motion';
import * as Form from '@radix-ui/react-form';

export const AnimateTitleInner = styled('div', {
  flex: 1,
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  height: '$header-title',
});

export const FormWrapper = styled(motion.div, {
  width: '100%',
  position: 'absolute',
  padding: '$default',
  paddingTop: 0,
});

export const FormField = styled(Form.Field, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$default',
  padding: '0 $default',
  marginBottom: '$double',
});

export const FormLabel = styled(Form.Label, {
  fontSize: '$header',
  fontWeight: '500',
});

export const FormMessage = styled(Form.Message, {
  color: '$red',
  fontSize: '$label-status',
  fontWeight: 500,
});
