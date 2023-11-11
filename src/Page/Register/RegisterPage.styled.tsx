import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import * as Form from '@radix-ui/react-form';

import { Tokens } from '@Styles/tokens';
const { fontSizes, sizes, space } = Tokens;

export const AnimateTitleInner = styled.div({
  flex: 1,
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  height: sizes.header.title,
});

export const FormWrapper = styled(motion.div)({
  width: '100%',
  position: 'absolute',
  padding: space.default,
  paddingTop: 0,
});

export const FormField = styled(Form.Field)({
  display: 'flex',
  flexDirection: 'column',
  gap: space.default,
  padding: `0 ${space.default}`,
  marginBottom: space.double,
});

export const FormLabel = styled(Form.Label)({
  ...fontSizes.header,
  fontWeight: '500',
});

export const FormMessage = styled(Form.Message)(
  {
    ...fontSizes['label-status'],
    fontWeight: 500,
  },
  ({ theme }) => ({
    color: theme.colors.text.alarm,
  })
);
