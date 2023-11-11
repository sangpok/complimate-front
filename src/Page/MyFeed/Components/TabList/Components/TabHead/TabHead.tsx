import React from 'react';

import * as S from './TabHead.styled';

const TabHead = ({ tabs, currentTabIndex, onClick }) => {
  return (
    <S.Container>
      <S.TabIndicatorBackground />

      {tabs.map((tab, index) => (
        <S.TabButton
          selected={index === currentTabIndex}
          variants={{
            selected: { fontWeight: 600 },
            normal: { fontWeight: 400 },
          }}
          animate={index === currentTabIndex ? 'selected' : 'normal'}
          onClick={() => onClick(index)}
        >
          {tab.name}
          {index === currentTabIndex && <S.TabIndicator layoutId="tabIndicator" />}
        </S.TabButton>
      ))}
    </S.Container>
  );
};

export default TabHead;
