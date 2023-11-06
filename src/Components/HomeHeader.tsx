import { useRef } from 'react';

import * as Icon from '@Icons/index';
import * as S from './HomeHeader.styled';

import { useAnimate } from 'framer-motion';
import type { HomeHeaderProp } from './HomeHeader.types';

const Root = S.Header;

const Hamburger = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <Icon.Hamburger />
    </button>
  );
};

const Refresh = ({ onClick }) => {
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

    onClick();
    animateRefresh();
  };

  return (
    <button ref={refreshScope} onClick={handleRefreshClick}>
      <Icon.Refresh />
    </button>
  );
};

const Write = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <Icon.Write />
    </button>
  );
};

const Group = ({ children }) => {
  return <div className="group">{children}</div>;
};

// export default HomeHeader;
export { Root, Hamburger, Refresh, Write, Group };
