import React, {
  Dispatch,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import styled from '@emotion/styled';

import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Transition,
  type Variants,
} from 'framer-motion';

enum TAB_ACTION {
  INITIALIZE_TAB = 'initializeTab',
  SELECT_TAB = 'selectTab',
}

enum DIRECTION {
  ToRight = 1,
  ToLeft = -1,
}

type TabAction = {
  type: TAB_ACTION;
  tabName?: string;
  tabIndex?: number;
};

type TabState = {
  selectedTab: {
    tabName: string;
    tabIndex: number;
    direction: DIRECTION;
  } | null;
};

const TabStateContext = createContext<TabState | null>(null);
const TabDispatchContext = createContext<Dispatch<TabAction> | null>(null);

const initialState: TabState = {
  selectedTab: null,
} as TabState;

const buttonVariants: Variants = {
  selected: { color: '#090909', fontWeight: 600 },
  normal: { color: '#999', fontWeight: 400 },
};

const contentVariants: Variants = {
  initial: (direction: number) => ({ x: `${-5 * direction}%`, opacity: 0 }),
  normal: { x: 0, opacity: 1 },
  out: (direction: number) => ({ x: `${5 * direction}%`, opacity: 0 }),
};

const transitionConfig: Transition = { duration: 0.2, ease: [0.12, 0, 0, 1] };

const tabReducer = (state: TabState, action: TabAction) => {
  const { selectedTab } = state;

  switch (action.type) {
    case TAB_ACTION.INITIALIZE_TAB: {
      const { tabIndex, tabName } = action;

      if (tabIndex === undefined || tabName === undefined) {
        throw new Error('tabIndex와 tabName이 이상해요');
      }

      return {
        ...state,
        selectedTab: {
          tabIndex,
          tabName,
          direction: DIRECTION.ToRight,
        },
      };
    }

    case TAB_ACTION.SELECT_TAB: {
      if (selectedTab === null) {
        throw new Error('selectTab 전에 initializeTab을 호출해야합니당');
      }

      const { tabName, tabIndex } = action;
      const { tabIndex: prevIndex } = selectedTab;

      if (tabIndex === undefined || tabName === undefined) {
        return state;
      }

      return {
        ...state,
        selectedTab: {
          tabIndex,
          tabName,
          direction: prevIndex < tabIndex ? DIRECTION.ToRight : DIRECTION.ToLeft,
        },
      };
    }

    default: {
      return state;
    }
  }
};

const Tab = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(tabReducer, initialState);

  return (
    <MotionConfig transition={transitionConfig}>
      <TabStateContext.Provider value={state}>
        <TabDispatchContext.Provider value={dispatch}>{children}</TabDispatchContext.Provider>
      </TabStateContext.Provider>
    </MotionConfig>
  );
};

type TabButtonProp = { isSelected?: boolean; tabName?: string; children?: ReactNode };
const TabButton = ({ tabName, isSelected, children, ...props }: TabButtonProp) => {
  const animateState = isSelected ? 'selected' : 'normal';

  return (
    <StyledButton
      {...props}
      key={`tabbutton-${tabName}`}
      variants={buttonVariants}
      animate={animateState}
    >
      {children}
      {isSelected && <TabIndicator layoutId="tabIndicator" />}
    </StyledButton>
  );
};

type TabContentProps = PropsWithChildren<{ tabName?: string }>;
const TabContent = ({ tabName, children }: TabContentProps) => {
  const { selectedTab } = useTabState();
  const { direction } = selectedTab!;

  return (
    <>
      <AbsoluteContainer
        key={`tabcontent-${tabName}`}
        variants={contentVariants}
        custom={direction}
        initial="initial"
        animate="normal"
        exit="out"
      >
        {children}
      </AbsoluteContainer>
    </>
  );
};

type TabListProp = PropsWithChildren<{ initialTab: string }>;
const TabList = ({ initialTab, children }: TabListProp) => {
  const { selectedTab } = useTabState();
  const dispatch = useTabDispatch();

  useEffect(() => {
    if (selectedTab === null) {
      const firstTabIndex = (React.Children.toArray(children) as ReactElement[]).findIndex(
        ({ props }: ReactElement) => props.tabName === initialTab
      );

      dispatch({
        type: TAB_ACTION.INITIALIZE_TAB,
        tabIndex: firstTabIndex,
        tabName: initialTab,
      });
    }
  }, [selectedTab]);

  return (
    <FullWidthFlexBox>
      {React.Children.map(children as ReactElement, (child: ReactElement, index) => {
        const isTabButton =
          isValidElement<TabButtonProp>(child) && child.type === (<TabButton />).type;

        if (!isTabButton) {
          return child;
        }

        const { tabName } = child.props;

        if (tabName === undefined) {
          throw new Error('tabName을 지정해주세용');
        }

        return (
          <child.type
            {...child.props}
            isSelected={selectedTab && tabName === selectedTab.tabName}
            onClick={() =>
              dispatch({
                type: TAB_ACTION.SELECT_TAB,
                tabIndex: index,
                tabName,
              })
            }
          />
        );
      })}
    </FullWidthFlexBox>
  );
};

const TabContentView = ({ children }: PropsWithChildren) => {
  const { selectedTab } = useTabState();

  if (selectedTab === null) {
    return;
  }

  return (
    <FullWidthFlexBox>
      <AnimatePresence initial={false} custom={selectedTab.direction}>
        {React.Children.map(
          children as ReactElement,
          (child: ReactElement) =>
            child.props.tabName === selectedTab.tabName && (
              <TabContent {...child.props}>{child}</TabContent>
            )
        )}
      </AnimatePresence>
    </FullWidthFlexBox>
  );
};

export const useTabState = () => {
  const tabState = useContext(TabStateContext);

  if (tabState === null) {
    throw new Error('tabState가 null입니당');
  }

  return tabState;
};

export const useTabDispatch = () => {
  const tabDispatch = useContext(TabDispatchContext);

  if (tabDispatch === null) {
    throw new Error('tabDispatch가 null입니당');
  }

  return tabDispatch;
};

const StyledButton = styled(motion.button)({
  all: 'unset',
  color: '#999',
  padding: '.8rem 0',
  position: 'relative',

  flex: 1,
  textAlign: 'center',
});

const TabIndicatorBackground = styled.div({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '3px',
  background: 'lightgray',
});

const FullWidthFlexBox = styled.div({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  position: 'relative',
});

const AbsoluteContainer = styled(motion.div)({
  position: 'absolute',
  width: '100%',
});

const TabIndicator = styled(motion.div)(
  {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '3px',
  },
  ({ theme }) => ({ background: theme.colors.background.point })
);

Tab.Button = TabButton;
Tab.Content = TabContent;
Tab.List = TabList;
Tab.ContentView = TabContentView;
Tab.IndicatorBackground = TabIndicatorBackground;

export { Tab };
