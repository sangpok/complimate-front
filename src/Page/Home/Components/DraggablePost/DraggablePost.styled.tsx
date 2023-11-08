import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const ContentSection = styled(motion.section)({
  // flex: 1,
  position: 'absolute',
  // margin-top: '$content',
  // paddingTop: '$content',
  width: '100%',
  height: '100%',
  // border: '1px solid red',
  willChange: 'transform',
});
