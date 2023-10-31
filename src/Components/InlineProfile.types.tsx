import { VariantProps } from '@stitches/react';
import { Container } from './InlineProfile.styled';

export type InlineProfileProp = {
  profile: string;
  nickname: string;
} & VariantProps<typeof Container>;
