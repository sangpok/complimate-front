import { styled } from '@/stitches.config';
import { motion } from 'framer-motion';

export const PageContent = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$double',
  position: 'absolute',
  padding: '0 $default',
  width: '100%',
});
