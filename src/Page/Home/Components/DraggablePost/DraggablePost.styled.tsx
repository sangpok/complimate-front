import DraggableComponent from '@Components/DraggableComponent';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

// export const ContentSection = styled(DraggableComponent)({
//   // // flex: 1,
//   // position: 'absolute',
//   // // margin-top: '$content',
//   // // paddingTop: '$content',
//   // width: '100%',
//   // height: '100%',
//   // // border: '1px solid red',
//   willChange: 'transform',
// });

export const StyledDraggableComponent = styled(DraggableComponent)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  willChange: 'transform',
});
