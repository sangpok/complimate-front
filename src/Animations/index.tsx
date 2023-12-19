import { useAppStore } from '@Store/AppStore';
import { AnimatePresence, motion } from 'framer-motion';
import React, { PropsWithChildren, ReactElement, cloneElement } from 'react';

type SnapTransitionProp = PropsWithChildren;

const contentSectionVariants = {
  before: (direction: number) => ({ y: `${100 * direction}%` }),
  normal: { y: 0 },
  exit: (direction: number) => ({ y: `${-100 * direction}%` }),
};

export const SnapTransition = ({ children }: SnapTransitionProp) => {
  const currentPostIndex = useAppStore<number>('currentPostIndex');
  const progressDirection = useAppStore<number>('progressDirection');

  return (
    <AnimatePresence custom={progressDirection} initial={false}>
      <motion.div
        key={`post-${currentPostIndex}`}
        custom={progressDirection}
        variants={contentSectionVariants}
        initial="before"
        animate="normal"
        exit="exit"
        style={{ height: '100%', width: '100%', position: 'absolute' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

type SlideAnimateProp = PropsWithChildren;
export const SlideAnimate = ({ children }: SlideAnimateProp) => {
  const firstChild = React.Children.toArray(children)[0] as ReactElement;
  const MotionedComponent = motion(firstChild.type);

  return cloneElement(
    <MotionedComponent initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} />,
    { ...firstChild.props }
  );
};

type FadeAnimateProp = PropsWithChildren;
export const FadeAnimate = ({ children }: FadeAnimateProp) => {
  const firstChild = React.Children.toArray(children)[0] as ReactElement;
  const MotionedComponent = motion(firstChild.type);

  return cloneElement(
    <MotionedComponent initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />,
    { ...firstChild.props }
  );
};
