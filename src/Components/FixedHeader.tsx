import { AnimatePresence } from 'framer-motion';

import * as Form from '@radix-ui/react-form';

import { Text } from './Atomic';

import { Header, LeftIcon, Title, TitleWrapper } from './FixedHeader.styled';

type FixedHeaderProp = {
  onPrevClick: () => void;
  progressDirection: number;
  title: string;
  nextContent: string;
};

const FixedHeader = ({ onPrevClick, progressDirection, title, nextContent }: FixedHeaderProp) => {
  return (
    <Header>
      <button type="button" onClick={onPrevClick}>
        <LeftIcon />
      </button>

      <TitleWrapper>
        <AnimatePresence custom={progressDirection} initial={false}>
          <Title
            key={title}
            type="header"
            variants={{
              initial: (progressDirection) => ({ y: `${100 * progressDirection}%` }),
              normal: { y: 0 },
              exit: (progressDirection) => ({ y: `${-100 * progressDirection}%` }),
            }}
            custom={progressDirection}
            initial="initial"
            animate="normal"
            exit="exit"
          >
            {title}
          </Title>
        </AnimatePresence>
      </TitleWrapper>

      <Form.Submit>
        <Text type="textButton">{nextContent}</Text>
      </Form.Submit>
    </Header>
  );
};

FixedHeader.Root = Form.Root;

export default FixedHeader;
