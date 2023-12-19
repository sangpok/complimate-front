import { PaddingLayout } from '@Layouts/PaddingLayout';
import { PageLayout } from '@Layouts/PageLayout';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { HorizontalLayout } from '@Layouts/HorizontalLayout';

import { VerticalLayout } from '@Layouts/VerticalLayout';
import { Tokens } from '@Styles/tokens';
const { sizes } = Tokens;

const shine = keyframes`
  100% {
    background-position: -100% 0;
  }
`;

const Dummy = styled.div({
  width: '100%',
  height: '100%',

  background: 'linear-gradient(120deg, #e5e5e5 30%, #f0f0f0 38%, #f0f0f0 40%, #e5e5e5 48%)',
  borderRadius: '1rem',
  backgroundSize: '200% 100%',
  backgroundPosition: '100% 0',

  animation: `${shine} 1s infinite`,
});

export const Skeleton = () => {
  return (
    <PaddingLayout.SideDouble hFull>
      <PageLayout
        head={
          <>
            <HorizontalLayout.Root style={{ marginBottom: '1rem' }}>
              <VerticalLayout>
                <HorizontalLayout.Group>
                  <span
                    style={{
                      width: sizes.profile.small,
                      height: sizes.profile.small,
                      marginRight: '.5rem',
                    }}
                  >
                    <Dummy />
                  </span>

                  <span style={{ width: '10rem', height: '1rem' }}>
                    <Dummy />
                  </span>
                </HorizontalLayout.Group>

                <div style={{ width: '100%', height: '1rem' }}>
                  <Dummy />
                </div>
              </VerticalLayout>

              <div style={{ width: '2rem', height: '2rem' }}>
                <Dummy style={{ borderRadius: '12px' }} />
              </div>
            </HorizontalLayout.Root>
          </>
        }
        body={
          <>
            <div style={{ width: '100%', height: '100%' }}>
              <Dummy />
            </div>
          </>
        }
        foot={
          <>
            <div style={{ width: '100%', height: '5rem', margin: '2rem 0 3rem' }}>
              <Dummy />
            </div>
          </>
        }
      />
    </PaddingLayout.SideDouble>
  );
};
