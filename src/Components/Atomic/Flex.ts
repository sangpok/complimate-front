import styled from '@emotion/styled';

type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type Justify = 'start' | 'center' | 'end' | 'between';
type Align = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';

const getPadding = (p, py, px, pt, pr, pb, pl) => {
  if (p) {
    return p;
  }

  if (py || px) {
    return `${py || 0} ${px || 0}`;
  }

  return `${pt || 0} ${pr || 0} ${pb || 0} ${pl || 0}`;
};

export const Flex = styled.div<{
  direction?: Direction;
  gap?: string;
  justify?: Justify;
  align?: Align;
  wrap?: Wrap;

  p?: string;
  py?: string;
  px?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;

  width?: string;
  height?: string;

  flex?: string;
}>(({ direction, justify, align, gap, wrap, p, py, px, pt, pr, pb, pl, width, height, flex }) => ({
  display: 'flex',
  flexDirection: direction || 'row',
  justifyContent: justify || 'start',
  alignItems: align || 'start',
  gap: gap || 0,
  flexWrap: wrap || 'wrap',

  padding: getPadding(p, py, px, pt, pr, pb, pl),

  width: width || '100%',
  height: height || 'auto',

  flex: flex || 'auto',
}));
