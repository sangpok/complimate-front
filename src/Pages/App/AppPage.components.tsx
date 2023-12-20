import styled from '@emotion/styled';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import paricleLottie from '@Animations/Lottie/particles.json';

import { LikeType } from '@Types/index';

const likeMap = {
  LIKE: { icon: '👍', name: '최고야' },
  PRAY: { icon: '🙏', name: '응원해' },
  LAUGH_WITH_SAD: { icon: '🤣', name: '뒤집어져' },
  HEART_EYES: { icon: '😍', name: 'OMG' },
  ANGEL_SMILE: { icon: '😇', name: '기절이야' },
};

const popoverAnimate = { opacity: [0, 1, 1, 0], scale: [0.7, 1], y: [50, 0] };
const popoverTransition = { duration: 1.3, ease: 'linear' };

type ParticleAnimateProp = { likeType: LikeType };

export const ParticleAnimate = ({ likeType }: ParticleAnimateProp) => {
  return (
    <>
      <ViewportCenter>
        <StyledLottie animationData={paricleLottie} />
      </ViewportCenter>

      <ViewportCenter animate={popoverAnimate} transition={popoverTransition}>
        <div>
          <Icon>{likeMap[likeType].icon}</Icon>
          <Name>{likeMap[likeType].name}</Name>
        </div>
      </ViewportCenter>
    </>
  );
};

const ViewportCenter = styled(motion.div)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100dvw',
  height: '100dvh',
  zIndex: 99,
  display: 'grid',
  placeContent: 'center',
  willChange: 'transform',
});

const Icon = styled.p({
  fontSize: '10rem',
  textAlign: 'center',
});

const Name = styled.p({
  fontSize: '3rem',
  fontWeight: 900,
  textAlign: 'center',
});

const StyledLottie = styled(Lottie)({
  width: '110dvw',
  height: '110dvh',
});
