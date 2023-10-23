import { styled } from '@/stitches.config';
import { Box, Text } from '@Components/Atomic';
import FixedHeader from '@Components/FixedHeader';
import PageTransition from '@Components/PageTransition';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Input = styled('input', {
  all: 'unset',
  border: '1px solid $point',
  borderRadius: '$small',
  padding: '$small $default',
  fontSize: '$input',
});

const PageContent = styled(motion.div, {
  position: 'absolute',
  padding: '0 $default',
  width: '100%',
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moveDirection, setMoveDirection] = useState(1);

  const registerFormList = [
    {
      id: 0,
      title: '이메일 입력',
      element: <ContentEmail />,
    },
    {
      id: 1,
      title: '비밀번호 입력',
      element: <ContentPassword />,
    },
    {
      id: 0,
      title: '닉네임 입력',
      element: <ContentNickname />,
    },
  ];

  const { title: currentTitle, element: currentElement } = registerFormList[currentIndex];

  const handlePrevClick = () => {
    setMoveDirection(-1);
    if (currentIndex === 0) {
      navigate('..');
    }
    setCurrentIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  const handleNextClick = () => {
    setMoveDirection(1);
    setCurrentIndex((prev) => (prev + 1 > 2 ? 2 : prev + 1));
  };

  return (
    <PageTransition>
      <FixedHeader
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        title={currentTitle}
        nextButtonName={currentIndex === 2 ? '완료' : '다음'}
      />
      <AnimatePresence custom={moveDirection} initial={false}>
        <PageContent
          key={currentIndex}
          custom={moveDirection}
          variants={{
            initial: (moveDirection) => ({ x: `${100 * moveDirection}%` }),
            normal: { x: 0 },
            exit: (moveDirection) => ({ x: `${-100 * moveDirection}%` }),
          }}
          initial="initial"
          animate="normal"
          exit="exit"
        >
          {currentElement}
        </PageContent>
      </AnimatePresence>
    </PageTransition>
  );
};

const ContentEmail = () => {
  return (
    <Box>
      <Text type="header">이메일</Text>
      <Input type="email" />
    </Box>
  );
};

const ContentPassword = () => {
  return (
    <Box>
      <Text type="header">비밀번호</Text>
      <Input type="password" />
    </Box>
  );
};

const ContentNickname = () => {
  return (
    <Box>
      <Text type="header">닉네임</Text>
      <Input type="text" />
    </Box>
  );
};

export default RegisterPage;
