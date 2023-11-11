import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Tokens } from '@Styles/tokens';
const { space } = Tokens;

export const Container = styled.div({
  width: '100%',
  flex: 1,
});

export const ListSection = styled.div({
  width: '100%',
  height: '100%',
});

export const ListSectionInner = styled.div({
  width: '100%',
  height: '100%',
  position: 'relative',
});

export const TabHeadSection = styled.div({});

export const AnimatedListSection = styled(motion.div)({
  width: '100%',
  height: '100%',
  position: 'absolute',
});
