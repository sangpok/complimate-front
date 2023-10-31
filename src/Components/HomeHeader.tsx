import { useRef } from 'react';

import * as Icon from '@Icons/index';
import * as S from './HomeHeader.styled';

import { useAnimate } from 'framer-motion';
import type { HomeHeaderProp } from './HomeHeader.types';

const HomeHeader = ({ onHamburgerClick, onRefreshClick, onWriteClick }: HomeHeaderProp) => {
  const [refreshScope, animateScope] = useAnimate();
  const refreshState = useRef('idle');

  const animateRefresh = async () => {
    refreshState.current = 'refreshing';

    await animateScope(
      refreshScope.current,
      { rotate: 360 },
      { duration: 0.7, type: 'spring', bounce: 0 }
    );
    await animateScope(refreshScope.current, { rotate: 0 }, { duration: 0 });

    refreshState.current = 'idle';
  };

  const handleRefreshClick = () => {
    if (refreshState.current !== 'idle') return;

    onRefreshClick();
    animateRefresh();
  };

  return (
    <S.Header>
      <button onClick={onHamburgerClick}>
        <Icon.Hamburger />
      </button>

      <div className="right">
        <button ref={refreshScope} onClick={handleRefreshClick}>
          <Icon.Refresh />
        </button>
        <button onClick={onWriteClick}>
          <Icon.Write />
        </button>
      </div>
    </S.Header>
  );
};

export default HomeHeader;
