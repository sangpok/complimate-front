import React, { useRef, useState } from 'react';

import * as S from './TabList.styled';
import * as C from './Components';
import { AnimatePresence } from 'framer-motion';
import DraggableComponent from '@Components/DraggableComponent';

const TabList = ({ tabs }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const listParentRef = useRef<HTMLDivElement>(null);

  const direction = currentTabIndex === 0 ? 1 : -1;

  const handleTabClick = (id: number) => {
    setCurrentTabIndex(id);
  };

  const handleViewClick = (id: string) => {
    console.log('Request to View: ', id);
  };

  const handleDeleteClick = (id: string) => {
    console.log('Request to Delete: ', id);
  };

  const handleModifyClick = (id: string) => {
    console.log('Request to Modify: ', id);
  };

  return (
    <S.Container>
      <S.TabHeadSection>
        <C.TabHead tabs={tabs} currentTabIndex={currentTabIndex} onClick={handleTabClick} />
      </S.TabHeadSection>

      <S.ListSection>
        <S.ListSectionInner>
          <AnimatePresence custom={direction} initial={false}>
            <S.AnimatedListSection
              key={currentTabIndex}
              variants={{
                initial: (direction) => ({ x: `${-100 * direction}%` }),
                normal: { x: 0 },
                out: (direction) => ({ x: `${100 * direction}%` }),
              }}
              custom={direction}
              initial="initial"
              animate="normal"
              exit="out"
            >
              <div ref={listParentRef} style={{ overflow: 'hidden' }}>
                <DraggableComponent dragId="List" axis="y" dragConstraints={listParentRef}>
                  <C.AccordionList
                    list={tabs[currentTabIndex].list}
                    onViewClick={handleViewClick}
                    onDeleteClick={handleDeleteClick}
                    onModifyClick={handleModifyClick}
                  />
                </DraggableComponent>
              </div>
            </S.AnimatedListSection>
          </AnimatePresence>
        </S.ListSectionInner>
      </S.ListSection>
    </S.Container>
  );
};

export default TabList;
