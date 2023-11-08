import { Theme } from '@emotion/react';

const base = {
  colors: {
    greenblue: '#135872',
    skyblue: '#4BB7E2',
    red: '#E91545',
    green: '#4CAF50',

    gray1: '#121212',
    gray2: '#292929',
    gray3: '#323232',
    gray4: '#797979',
    gray5: '#929292',
    gray6: '#D9D9D9',
    gray7: '#F2F2F2',
    gray8: '#F9F9F9',
    gray9: '#FFFFFF',

    white: '#FFF',
    black: '#121212',
  },

  fontSizes: {
    _9: '.5625rem', // 9
    _12: '.75rem', // 12
    _14: '.875rem', // 14
    _16: '1rem', // 16
    _18: '1.125rem', // 18
    _20: '1.25rem', // 20
    _24: '1.5rem', // 24
    _28: '1.75rem', // 28
    _32: '2rem', // 32
    _42: '2.625rem', // 42
    _48: '3rem', // 48
    _64: '4rem', // 64
    _128: '8rem', // 128
  },

  space: {
    _1: '.0625rem', // 1
    _4: '.25rem', // 4
    _8: '.5rem', // 8
    _12: '.75rem', // 12
    _24: '1.5rem', // 24
    _32: '2rem', // 32
    _48: '3rem', // 48
    _80: '5rem', // 80
  },

  lineHeights: {
    _22: '1.375rem',
    _26: '1.625rem',
    _28: '1.75rem',
  },

  sizes: {
    _4: '.25rem', // 4
    _9: '.5625rem', // 9
    _12: '.75rem', // 12
    _14: '.875rem', // 14
    _16: '1rem', // 16
    _18: '1.125rem', // 18
    _24: '1.5rem', // 24
    _28: '1.75rem', // 28
    _32: '2rem', // 32
    _42: '2.5rem', // 42
    _50: '3.125rem', //50
    _48: '3rem', // 48
    _64: '4rem', // 64
    _80: '5rem',
    _128: '8rem', // 128
    _300: '18.75rem', //300
  },

  borderWidths: {
    _1: '.0625rem',
  },

  radii: {
    _4: '.25rem',
    _12: '.75rem',
    _9999: '624.9375rem',
  },
};

const defaultStyles = {
  colors: {
    base: { ...base.colors },
  },
  fontSizes: {
    base: { ...base.fontSizes },

    logo: base.fontSizes._32,
    caption: base.fontSizes._12,
    default: base.fontSizes._14,

    button: {
      sm: base.fontSizes._14,
      lg: base.fontSizes._16,
      text: base.fontSizes._18,
    },

    input: base.fontSizes._18,

    tutorial: {
      title: base.fontSizes._28,
      content: base.fontSizes._18,
    },

    header: base.fontSizes._18,

    post: {
      time: base.fontSizes._14,
      content: base.fontSizes._14,
      author: base.fontSizes._18,
      comment: base.fontSizes._16,
      like: base.fontSizes._14,
    },

    'label-status': base.fontSizes._16,
    menu: base.fontSizes._20,

    drawer: {
      header: base.fontSizes._20,
    },
  },

  space: {
    base: { ...base.space },

    small: base.space._4,
    smaller: base.space._8,
    default: base.space._12,
    double: base.space._24,
    quard: base.space._48,
    content: base.space._80,
    'tutorial-body': base.space._32,
  },

  lineHeights: {
    base: { ...base.lineHeights },

    tutorialContent: base.lineHeights._28,
    postContent: base.lineHeights._26,
    comment: base.lineHeights._22,
  },

  sizes: {
    base: { ...base.sizes },

    nav: base.sizes._9,
    icon: {
      default: base.sizes._32,
      small: base.sizes._24,
      menu: base.sizes._28,
      comment: base.sizes._18,
    },
    logo: {
      default: base.sizes._128,
      small: base.sizes._32,
    },
    profile: {
      small: base.sizes._18,
      medium: base.sizes._42,
      large: base.sizes._128,
      replyTarget: base.sizes._12,
    },
    header: {
      default: base.sizes._80,
      title: base.sizes._16,
    },
    drawer: {
      height: base.sizes._50,
      handleWidth: base.sizes._50,
      handleHeight: base.sizes._4,
    },
    button: {
      comment: base.sizes._64,
    },

    menu: {
      maxWidth: base.sizes._300,
    },
  },
  borderWidths: {
    base: { ...base.borderWidths },
    default: base.borderWidths._1,
  },
  radii: {
    base: { ...base.radii },
    small: base.radii._4,
    large: base.radii._12,
    full: base.radii._9999,
  },
  media: {
    sm: '@media (min-width: 640px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 1024px)',
    xl: '@media (min-width: 1440px)',
  },
};

const lightTheme: Theme = {
  ...defaultStyles,
  colors: {
    base: { ...base.colors },

    point: base.colors.greenblue,
    secondary: base.colors.skyblue,
    bg: base.colors.white,
    body: base.colors.black,
    depth1: base.colors.gray8,
    depth2: base.colors.gray6,
    depth3: base.colors.gray4,

    text: {
      default: base.colors.black,
      point: base.colors.greenblue,
      secondary: base.colors.skyblue,
      greyed: base.colors.gray4,
      inversion: base.colors.black,
      alarm: base.colors.red,
      success: base.colors.green,
    },

    background: {
      default: base.colors.white,
      point: base.colors.greenblue,
      depth: base.colors.gray8,
    },

    border: {
      point: base.colors.greenblue,
      depth: base.colors.gray6,
      alarm: base.colors.red,
    },

    button: {
      default: base.colors.black,
      point: base.colors.greenblue,
      inversion: base.colors.white,
      disabled: base.colors.gray5,
    },

    icon: {
      default: base.colors.black,
      point: base.colors.greenblue,
      inversion: base.colors.white,
      disabled: base.colors.gray6,
    },

    input: {
      background: base.colors.white,
      disabled: base.colors.gray5,
    },

    nav: {
      default: base.colors.gray6,
      selected: base.colors.greenblue,
    },
  },
};

const darkTheme: Theme = {
  ...defaultStyles,
  colors: {
    base: { ...base.colors },

    point: base.colors.skyblue,
    secondary: base.colors.greenblue,
    bg: base.colors.gray2,
    body: base.colors.gray7,
    depth1: base.colors.gray3,
    depth2: base.colors.gray5,
    depth3: base.colors.gray6,

    text: {
      default: base.colors.white,
      point: base.colors.skyblue,
      secondary: base.colors.greenblue,
      greyed: base.colors.gray6,
      inversion: base.colors.gray2,
      alarm: base.colors.red,
      success: base.colors.green,
    },

    background: {
      default: base.colors.black,
      point: base.colors.skyblue,
      depth: base.colors.gray6,
    },

    border: {
      point: base.colors.skyblue,
      depth: base.colors.gray6,
      alarm: base.colors.red,
    },

    button: {
      default: base.colors.white,
      point: base.colors.skyblue,
      inversion: base.colors.black,
      disabled: base.colors.gray5,
    },

    icon: {
      default: base.colors.white,
      point: base.colors.skyblue,
      inversion: base.colors.black,
      disabled: base.colors.gray5,
    },

    input: {
      background: base.colors.black,
      disabled: base.colors.gray5,
    },

    nav: {
      default: base.colors.gray5,
      selected: base.colors.skyblue,
    },
  },
};

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      base: {
        greenblue: string;
        skyblue: string;
        red: string;
        green: string;

        gray1: string;
        gray2: string;
        gray3: string;
        gray4: string;
        gray5: string;
        gray6: string;
        gray7: string;
        gray8: string;
        gray9: string;

        white: string;
        black: string;
      };

      point: string;
      secondary: string;
      bg: string;
      body: string;
      depth1: string;
      depth2: string;
      depth3: string;

      text: {
        default: string;
        point: string;
        secondary: string;
        greyed: string;
        inversion: string;
        alarm: string;
        success: string;
      };

      background: {
        default: string;
        point: string;
        depth: string;
      };

      border: {
        point: string;
        depth: string;
        alarm: string;
      };

      button: {
        default: string;
        point: string;
        inversion: string;
        disabled: string;
      };

      icon: {
        default: string;
        point: string;
        inversion: string;
        disabled: string;
      };

      input: {
        background: string;
        disabled: string;
      };

      nav: {
        default: string;
        selected: string;
      };
    };
    fontSizes: {
      base: {
        _9: string;
        _12: string;
        _14: string;
        _16: string;
        _18: string;
        _20: string;
        _24: string;
        _28: string;
        _32: string;
        _42: string;
        _48: string;
        _64: string;
        _128: string;
      };

      logo: string;
      caption: string;
      default: string;

      button: {
        sm: string;
        lg: string;
        text: string;
      };

      input: string;

      tutorial: {
        title: string;
        content: string;
      };

      header: string;

      post: {
        time: string;
        content: string;
        author: string;
        comment: string;
        like: string;
      };

      'label-status': string;
      menu: string;

      drawer: {
        header: string;
      };
    };
    space: {
      base: {
        _1: string;
        _4: string;
        _8: string;
        _12: string;
        _24: string;
        _32: string;
        _48: string;
        _80: string;
      };

      small: string;
      smaller: string;
      default: string;
      double: string;
      quard: string;
      content: string;
      'tutorial-body': string;
    };
    lineHeights: {
      base: {
        _22: string;
        _26: string;
        _28: string;
      };

      tutorialContent: string;
      postContent: string;
      comment: string;
    };
    sizes: {
      base: {
        _4: string;
        _9: string;
        _12: string;
        _14: string;
        _16: string;
        _18: string;
        _24: string;
        _28: string;
        _32: string;
        _42: string;
        _48: string;
        _64: string;
        _128: string;
      };
      nav: string;
      icon: {
        default: string;
        small: string;
        menu: string;
        comment: string;
      };
      logo: {
        default: string;
        small: string;
      };
      profile: {
        small: string;
        medium: string;
        large: string;
        replyTarget: string;
      };
      header: {
        default: string;
        title: string;
      };

      drawer: {
        height: string;
        handleWidth: string;
        handleHeight: string;
      };

      button: {
        comment: string;
      };

      menu: {
        maxWidth: string;
      };
    };
    borderWidths: {
      base: {
        _1: string;
      };
      default: string;
    };
    radii: {
      base: {
        _4: string;
        _12: string;
        _9999: string;
      };
      small: string;
      large: string;
      full: string;
    };
    media: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}

export { lightTheme, darkTheme, defaultStyles as token };
