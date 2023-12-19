import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Tokens } from '@Styles/tokens';
const { space } = Tokens;

export const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
});

export const TabButton = styled(motion.button)<{ selected: boolean }>(
  {
    all: 'unset',

    flex: 1,
    padding: space.default,
    textAlign: 'center',

    position: 'relative',
  },
  ({ theme, selected }) => ({
    color: selected ? theme.colors.text.default : theme.colors.text.greyed,
  })
);
export const TabIndicatorBackground = styled.div({
  width: '100%',
  height: '3px',
  background: 'lightgray',
  position: 'absolute',
  bottom: 0,
  left: 0,
});

export const TabIndicator = styled(motion.div)(
  {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '3px',
  },
  ({ theme }) => ({
    background: theme.colors.point,
  })
);
