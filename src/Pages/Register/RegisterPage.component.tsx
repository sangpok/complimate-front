import * as Header from '@Components/PageHeader';
import * as S from './RegisterPage.styled';

import { AnimatePresence, motion } from 'framer-motion';
import { AnimateFormProp, AnimateTitleProp } from './RegisterPage.types';
import { useRegisterMutation, useRegisterState } from '@Contexts/RegisterContext';

const titleVariant = {
  initial: (progressDirection: number) => ({ y: `${100 * progressDirection}%` }),
  normal: { y: 0 },
  exit: (progressDirection: number) => ({ y: `${-100 * progressDirection}%` }),
};

const formVariant = {
  initial: (progressDirection: number) => ({ x: `${100 * progressDirection}%` }),
  normal: { x: 0 },
  exit: (progressDirection: number) => ({
    x: `${-100 * progressDirection}%`,
  }),
};

export const AnimateTitle = ({ title, children }: AnimateTitleProp) => {
  const { animateState } = useRegisterState();
  const { setAnimatingStateToEnd } = useRegisterMutation();

  const { progressDirection } = animateState;

  return (
    <S.AnimateTitleInner>
      <AnimatePresence initial={false} custom={progressDirection}>
        <motion.div
          key={title}
          custom={progressDirection}
          variants={titleVariant}
          initial="initial"
          animate="normal"
          exit="exit"
          style={{ position: 'absolute', width: '100%' }}
          onAnimationComplete={() => setAnimatingStateToEnd()}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </S.AnimateTitleInner>
  );
};

export const AnimateForm = ({ title, children }: AnimateFormProp) => {
  const { animateState } = useRegisterState();
  const { progressDirection } = animateState;

  return (
    <AnimatePresence initial={false} custom={progressDirection}>
      <S.FormWrapper
        key={title}
        custom={progressDirection}
        variants={formVariant}
        initial="initial"
        animate="normal"
        exit="exit"
        // onAnimationComplete={(def) => {
        //   // console.log({ def });
        //   if (def === 'normal') {
        //     // focusAndOpenKeyboard(firstInputElement.current, 500);
        //     firstInputElement.current?.focus();
        //   }
        // }}
      >
        {children}
      </S.FormWrapper>
    </AnimatePresence>
  );
};
