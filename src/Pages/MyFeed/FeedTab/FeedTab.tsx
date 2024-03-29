import { createPortal } from 'react-dom';
import { MyComment, MyCompliment } from '@Types/index';
import { AccordionList } from '../AccordionList';
import { Tab } from './Tab';

import styled from '@emotion/styled';
import { ComplimentModal } from '../ComplimentModal';
import { useReducer, useState } from 'react';

type TabContentProp<T> = { list: T[] };

type FeedTabProp = {
  compliments: MyCompliment[];
  comments: MyComment[];
};

const CommentTabContent = ({ list: comments }: TabContentProp<MyComment>) => {
  return (
    <ScrollContainer>
      <AccordionList
        list={comments}
        onViewClick={() => {}}
        onDeleteClick={() => {}}
        onModifyClick={() => {}}
      />
    </ScrollContainer>
  );
};

const ComplimentTabContent = ({ list: compliments }: TabContentProp<MyCompliment>) => {
  // const [isModalShow, setIsModalShow] = useState(false)
  const [feedModal, feedModalDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'show': {
          return { isShow: true, feedId: action.feedId };
        }

        case 'hide': {
          return { isShow: false, feedId: null };
        }

        default: {
          return state;
        }
      }
    },
    { isShow: false, feedId: null }
  );

  console.log({ feedModal });

  const portalModal = createPortal(
    <ComplimentModal {...feedModal} onClose={() => feedModalDispatch({ type: 'hide' })} />,
    document.body
  );

  return (
    <>
      <ScrollContainer>
        <AccordionList
          list={compliments}
          onViewClick={(id) => {
            feedModalDispatch({ type: 'show', feedId: id });
          }}
          onDeleteClick={() => {}}
          onModifyClick={() => {}}
        />
      </ScrollContainer>
      {portalModal}
    </>
  );
};

export const FeedTab = ({ compliments, comments }: FeedTabProp) => {
  return (
    <Tab>
      <Tab.List initialTab="A">
        <Tab.IndicatorBackground />
        <Tab.Button tabName="A">내가 쓴 칭찬해줘</Tab.Button>
        <Tab.Button tabName="B">내가 쓴 칭찬할게</Tab.Button>
      </Tab.List>

      <Tab.ContentView>
        <Tab.Content tabName="A">
          <ComplimentTabContent list={compliments} />
        </Tab.Content>

        <Tab.Content tabName="B">
          <CommentTabContent list={comments} />
        </Tab.Content>
      </Tab.ContentView>
    </Tab>
  );
};

const ScrollContainer = styled.div({
  height: '100%',
  overflowY: 'scroll',

  '&::-webkit-scrollbar': {
    width: '16px',
  },

  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#606060',
    border: '4px solid transparent',
    borderRadius: '8px',
    backgroundClip: 'content-box',
  },
});
