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
const { space } = Tokens;

export const AppHeader = () => {
  const navigate = useNavigate();

  return (
    <PaddingLayout.Double wFull>
      <HorizontalLayout.Root>
        <IconButton onClick={() => AppStore.showSideMenu()}>
          <HamburgerIcon />
        </IconButton>

        <HorizontalLayout.Group gap={space.default}>
          <IconButton onClick={() => {}}>
            <RefreshIcon />
          </IconButton>

          <IconButton onClick={() => navigate('/app/write', { replace: true })}>
            <WriteIcon />
          </IconButton>
        </HorizontalLayout.Group>
      </HorizontalLayout.Root>
    </PaddingLayout.Double>
  );
};
