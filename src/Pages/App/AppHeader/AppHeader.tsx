import { HorizontalLayout } from '@Layouts/HorizontalLayout';
import { PaddingLayout } from '@Layouts/PaddingLayout';

import { IconButton } from '@Components/IconButton';

import {
  Hamburger as HamburgerIcon,
  Refresh as RefreshIcon,
  Write as WriteIcon,
} from '@Icons/index';

import { Tokens } from '@Styles/tokens';
import { useNavigate } from 'react-router-dom';
import { AppStore } from '@Store/AppStore';
import { useQueryClient } from '@tanstack/react-query';
const { space } = Tokens;

import { motion, useAnimate } from 'framer-motion';
import { useRef } from 'react';

export const AppHeader = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [rotateScope, animateRotate] = useAnimate();
  const rotateCount = useRef(0);

  const handleRefresh = async () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
    animateRotate(rotateScope.current, { rotate: `${360 * rotateCount.current}deg` });
    rotateCount.current = rotateCount.current + 1;
  };

  return (
    <PaddingLayout.Double wFull>
      <HorizontalLayout.Root>
        <IconButton onClick={() => AppStore.showSideMenu()}>
          <HamburgerIcon />
        </IconButton>

        <HorizontalLayout.Group gap={space.default}>
          <IconButton onClick={() => handleRefresh()}>
            <div ref={rotateScope} style={{ display: 'flex' }}>
              <RefreshIcon />
            </div>
          </IconButton>

          <IconButton onClick={() => navigate('/app/write', { replace: true })}>
            <WriteIcon />
          </IconButton>
        </HorizontalLayout.Group>
      </HorizontalLayout.Root>
    </PaddingLayout.Double>
  );
};
