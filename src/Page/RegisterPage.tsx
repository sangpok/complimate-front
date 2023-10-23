import { styled } from '@/stitches.config';
import { Box, Text } from '@Components/Atomic';
import FixedHeader from '@Components/FixedHeader';

const PageContent = styled('div', {
  marginTop: '$content',
  padding: '0 $default',
});

const Input = styled('input', {
  all: 'unset',

  border: '1px solid $point',
  borderRadius: '$small',

  padding: '$small $default',

  fontSize: '$input',
});

const RegisterPage = () => {
  return (
    <>
      <FixedHeader />
      <PageContent>
        <Box>
          <Text type="header">이메일</Text>
          <Input type="email" />
        </Box>
      </PageContent>
    </>
  );
};

export default RegisterPage;
