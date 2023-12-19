import { Global, css } from '@emotion/react';
import { Tokens } from './tokens';
const { media } = Tokens;

export const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Pretendard Variable;
        -webkit-tap-highlight-color: transparent;
      }

      html {
        touch-action: none;
        user-select: none;
      }

      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }

      :root {
        font-size: calc(100vw / 22.5); // 22.5: w360 기준 16px
      }

      fieldset {
        border: none;
      }

      ${media.md} {
        :root {
          font-size: calc(100vw / 48);
        }
      }

      ${media.lg} {
        :root {
          font-size: calc(100vw / 64);
        }
      }

      ${media.xl} {
        :root {
          font-size: calc(100vw / 90);
        }
      }

      /* button,
      a {
        position: relative;

        &:focus-visible {
          &::before {
            content: '';
            position: absolute;
            inset: -0.1875rem;
            border: 0.1875rem solid rgb(167, 187, 255);
            border-radius: 0.4375rem;
          }
        }
      } */
    `}
  />
);
