import { Tokens } from '@Styles/tokens';
const { sizes, space } = Tokens;

import * as Icon from '@Icons/index';
import { GoogleButtonInner } from './LandingPage.styled';
import { Flex } from '@Components/Atomic/Flex';
import { GoogleButtonProp } from './LandingPage.types';

export const GoogleButton = ({ to, children }: GoogleButtonProp) => {
  return (
    <GoogleButtonInner to={to}>
      <Flex justify="center" align="center" gap={space.small}>
        <Icon.Google width={sizes.base._24} />
        {children}
      </Flex>
    </GoogleButtonInner>
  );
};
