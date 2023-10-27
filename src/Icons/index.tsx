import { styled } from '@/stitches.config';

import { ReactComponent as LeftIconInner } from '@Icons/mdi_chevron-left.svg';
import { ReactComponent as LogoInner } from '../Icons/complimate-logo.svg';
import { ReactComponent as GoogleIconInner } from '@Icons/google.svg';
import { ReactComponent as EmailIconInner } from '@Icons/ic_outline-email.svg';
import { ReactComponent as PasswordIConInner } from '@Icons/mdi_lock-outline.svg';

export const Email = styled(EmailIconInner, {
  width: '$icon-sm',
  height: '$icon-sm',
  color: '$depth2',
});

export const Password = styled(PasswordIConInner, {
  width: '$icon-sm',
  height: '$icon-sm',
  color: '$depth2',
});

export const Left = styled(LeftIconInner, {
  width: '$icon-sm',
  height: '$icon-sm',
  color: '$depth2',
});

export const Logo = styled(LogoInner, {
  width: '$logo',
  height: '$logo',
  color: '$depth2',
});

export const Google = styled(GoogleIconInner, {
  width: '$icon-sm',
  height: '$icon-sm',
  color: '$depth2',
});
