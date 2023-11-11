import styled from '@emotion/styled';

const Full = styled.div({
  width: '100dvw',
  height: '100dvh',
});

const Root = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignitems: 'center',

  position: 'relative',

  width: '100%',
  height: '100%',

  // border: '1px solid cyan',
});

const Head = styled.header({
  position: 'relative',
  width: '100%',

  // border: '1px solid red',
});

const Body = styled.section({
  flex: '1',
  minHeight: 0,
  width: '100%',
  position: 'relative',

  // border: '1px solid green',
});

const Foot = styled.footer({
  width: '100%',
  // border: '1px solid blue',
});

export { Body, Foot, Full, Head, Root };
