import React, { PropsWithChildren, ReactElement, cloneElement, useState } from 'react';

import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { FadeAnimate } from '@Animations/index';

const ModalBackground = styled.div({
  position: 'absolute',
  inset: 0,
  background: 'rgba(0, 0, 0, .4)',
});

type ModalProp = {
  shouldShow: boolean;
  onClose: () => void;
  afterClose?: () => void;
};

type ModalLayoutProp = PropsWithChildren<ModalProp>;

export const ModalLayout = ({ shouldShow, onClose, afterClose, children }: ModalLayoutProp) => {
  return (
    <AnimatePresence onExitComplete={afterClose}>
      {shouldShow && (
        <FadeAnimate>
          <ModalBackground onClick={onClose}>{children}</ModalBackground>
        </FadeAnimate>
      )}
    </AnimatePresence>
  );
};
