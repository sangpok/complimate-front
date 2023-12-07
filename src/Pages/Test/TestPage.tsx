// import { useRef, ReturnType } from 'react';

// import * as Layout from '@Layouts/DefaultLayout';
// import * as Icon from '@Icons/index';
// // import { css, styled } from '@/stitches.config';
// import { motion } from 'framer-motion';
// import styled from '@emotion/styled';

// const text = styled.p`
//   color: ${({ theme }) => theme.colors.point};
// `;

// const TriggerButton = styled.div`
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',

//   backgorund: '$depth2',
//   padding: '1rem',

//   height: 'fit-content',
//   aspectRatio: '1 / 1',

//   box-shadow: '0 0 16px 1px rgba(0, 0, 0, .2)',

//   borderRadius: '9999px',
//   overflow: 'hidden',
// });

// const TriggeredMenu = styled(motion.div, {
//   position: 'absolute',
//   width: '100%',
//   top: 0,
// });

// const ContentContainer = styled.div`
//   display: 'flex',
//   flexDirection: column,
//   justifyContent: 'center',
//   alignItems: 'center',

//   padding: '.5rem 0',

//   span: { fontWeight: 600, color: '$point' },
// });

// const List = styled('ul', {
//   display: 'flex',
//   flexDirection: column,

//   justifyContent: 'center',
//   alignItems: 'center',

//   backgorund: '$depth2',
//   padding: '.5rem',

//   box-shadow: '0 0 16px 1px rgba(0, 0, 0, .2)',
//   borderRadius: '99rem',
//   background: 'white',

//   li: {
//     all: 'unset',
//   },
// });

// const Content = ({ Icon, text }) => {
//   return (
//     <ContentContainer>
//       <Icon
//         css={{
//           width: '$icon-sm',
//           height: '$icon-sm',
//           color: '$point',
//         }}
//       />
//       <span>{text}</span>
//     </ContentContainer>
//   );
// };

// const DraggableSelectContainer = styled.div`
//   position: 'relative',
// });

// const list = [
//   {
//     id: 0,
//     Icon: Icon.Heart,
//     count: 1,
//   },
//   {
//     id: 1,
//     Icon: Icon.Heart,
//     count: 2,
//   },
//   {
//     id: 2,
//     Icon: Icon.Heart,
//     count: 3,
//   },
//   {
//     id: 3,
//     Icon: Icon.Heart,
//     count: 4,
//   },
// ];

// const TestPage = () => {
//   const timerInstance = useRef<ReturnType<typeof setTimeout>>(null);
//   const [isPressed, setIsPressed] = useState(false);
//   const longPressCallback = () => {};

//   const handleTriggerButtonClick = () => {
//     timerInstance.current = setTimeout(() => {
//       if (timerInstance.current && !isPressed.current) {
//         isPressed.current = true;
//         longPressCallback();
//       }
//     }, 600);
//   };

//   return (
//     <Layout.Full>
//       <Layout.Root>
//         <DraggableSelectContainer>
//           <TriggerButton onClick={handleTriggerButtonClick}>
//             <Content Icon={Icon.Hamburger} text="1" />
//           </TriggerButton>

//           <TriggeredMenu variants>
//             <List>
//               {list.map((item) => (
//                 <li key={item.id}>
//                   <Content Icon={item.Icon} text={item.count} />
//                 </li>
//               ))}
//             </List>
//           </TriggeredMenu>
//         </DraggableSelectContainer>
//       </Layout.Root>
//     </Layout.Full>
//   );
// };

// export default TestPage;
