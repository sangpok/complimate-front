import { styled } from '@/stitches.config';
import { motion } from 'framer-motion';

export const PageContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100dvw',
  height: '100dvh',
});

export const ContentSectionWrapper = styled('div', {
  flex: 1,
  position: 'relative',
  // width:
});

export const ContentSection = styled(motion.section, {
  // flex: 1,
  position: 'absolute',
  // marginTop: '$content',
  // paddingTop: '$content',
  width: '100%',
  height: '100%',
  // border: '1px solid red',
  willChange: 'transform',
});
