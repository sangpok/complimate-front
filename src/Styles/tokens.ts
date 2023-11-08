import { token } from './theme';
const { colors, fontSizes, lineHeights, borderWidths, radii, media } = token;

export const Tokens = {
  ...token,
  fontSizes: {
    base: { ...token.fontSizes.base },

    logo: { fontSize: fontSizes.logo },
    caption: { fontSize: fontSizes.caption },
    default: { fontSize: fontSizes.default },

    button: {
      sm: { fontSize: fontSizes.button.sm },
      lg: { fontSize: fontSizes.button.lg },
      text: { fontSize: fontSizes.button.text },
    },

    input: { fontSize: fontSizes.input },

    tutorial: {
      title: { fontSize: fontSizes.tutorial.title },
      content: { fontSize: fontSizes.tutorial.content },
    },

    header: { fontSize: fontSizes.header },

    post: {
      time: { fontSize: fontSizes.post.time },
      content: { fontSize: fontSizes.post.content },
      author: { fontSize: fontSizes.post.author },
      comment: { fontSize: fontSizes.post.comment },
      like: { fontSize: fontSizes.post.like },
    },

    'label-status': { fontSize: fontSizes['label-status'] },
    menu: { fontSize: fontSizes.menu },

    drawer: {
      header: { fontSize: fontSizes.drawer.header },
    },
  },
  lineHeights: {
    tokens: { ...token.lineHeights },

    tutorialContent: { lineHeight: lineHeights.tutorialContent },
    postContent: { lineHeight: lineHeights.postContent },
    comment: { lineHeight: lineHeights.comment },
  },
  borderWidths: {
    base: { ...token.borderWidths.base },
    default: { borderWidth: borderWidths.default },
  },
  radii: {
    tokens: { ...token.radii },
    small: { borderRadius: radii.small },
    large: { borderRadius: radii.large },
    full: { borderRadius: radii.full },
  },
  media: {
    sm: media.sm,
    md: media.md,
    lg: media.lg,
    xl: media.xl,
  },
};
