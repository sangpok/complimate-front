export const globalStyle = {
  '@import': [
    "url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable-dynamic-subset.css')",
  ],

  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: 'Pretendard Variable',
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'none',
    userSelect: 'none',
  },

  '@initial': {
    ':root': {
      fontSize: 'calc(100vw / 22.5)',
    },
  },

  '@md': {
    ':root': {
      fontSize: 'calc(100vw / 48)',
    },
  },

  '@lg': {
    ':root': {
      fontSize: 'calc(100vw / 64)',
    },
  },

  '@xl': {
    ':root': {
      fontSize: 'calc(100vw / 90)',
    },
  },
};
