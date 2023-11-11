import * as Accordion from '@radix-ui/react-accordion';
import styled from '@emotion/styled';
import * as Icon from '@Icons/index';
import { Tokens } from '@Styles/tokens';
import { color } from 'framer-motion';
import { keyframes } from '@emotion/react';
const { colors, sizes, space, fontSizes, borderWidths, radii } = Tokens;

export const CommentIcon = styled(Icon.Comment)(
  {
    width: sizes.icon.comment,
    height: sizes.icon.comment,
  },
  ({ theme }) => ({
    color: theme.colors.icon.disabled,
  })
);

export const HeartIcon = styled(Icon.Heart)(
  {
    width: sizes.icon.comment,
    height: sizes.icon.comment,
  },
  ({ theme }) => ({
    color: theme.colors.icon.disabled,
  })
);

export const AccordionRoot = styled(Accordion.Root)({
  width: '100%',
  background: 'lightgray',
});

export const AccordionItem = styled(Accordion.Item)({
  width: '100%',
  background: 'white',
});

export const AccordionTrigger = styled(Accordion.Trigger)(
  {
    all: 'unset',

    boxSizing: 'border-box',

    display: 'flex',
    flexDirection: 'column',
    gap: space.smaller,

    width: '100%',
    padding: space.default,

    ...fontSizes.default,

    'p.content': {
      fontWeight: 500,
    },

    'div.count-section': {
      display: 'flex',
      flexDirection: 'row',
      gap: space.double,

      'div.group': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: space.small,
      },
    },
  },
  ({ theme }) => ({
    borderBottom: `${borderWidths.base._1} solid ${theme.colors.border.depth}`,

    'div.count-section': {
      color: theme.colors.text.greyed,
    },
  })
);

export const ContentInner = styled.div(
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.default,

    padding: space.default,

    button: {
      all: 'unset',
      flex: 1,
      boxSizing: 'border-box',
      background: colors.base.white,

      padding: space.smaller,

      ...fontSizes.button.sm,
      fontWeight: 700,
      textAlign: 'center',
      ...radii.small,

      '&.view': {
        border: `${borderWidths.base._1} solid ${colors.base.black}`,
        color: colors.base.black,
      },

      '&.delete': {
        border: `${borderWidths.base._1} solid ${colors.base.red}`,
        color: colors.base.red,
      },

      '&.modify': {
        border: `${borderWidths.base._1} solid ${colors.base.greenblue}`,
        color: colors.base.greenblue,
      },
    },
  },
  ({ theme }) => ({
    background: theme.colors.background.depth,
  })
);

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

export const AccordionContent = styled(Accordion.Content)({
  overflow: 'hidden',
  '&[data-state="open"]': {
    animation: `${slideDown} 150ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 150ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});
