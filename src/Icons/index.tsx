import styled from '@emotion/styled';
import { Tokens } from '@Styles/tokens';

const { sizes } = Tokens;

import type { ComponentType, SVGProps } from 'react';

import { ReactComponent as GoogleIconInner } from '@Icons/google.svg';
import { ReactComponent as EmailIconInner } from '@Icons/ic_outline-email.svg';
import { ReactComponent as ProfileInner } from '@Icons/iconoir_profile-circle.svg';
import { ReactComponent as CommentInner } from '@Icons/material-symbols_comment-outline.svg';
import { ReactComponent as RefreshInner } from '@Icons/material-symbols_refresh.svg';
import { ReactComponent as SortInner } from '@Icons/material-symbols_sort.svg';
import { ReactComponent as LeftIconInner } from '@Icons/mdi_chevron-left.svg';
import { ReactComponent as HomeInner } from '@Icons/mdi_home.svg';
import { ReactComponent as PasswordIconInner } from '@Icons/mdi_lock-outline.svg';
import { ReactComponent as WriteInner } from '@Icons/mdi_pencil-outline.svg';
import { ReactComponent as HamburgerInner } from '@Icons/quill_hamburger.svg';
import { ReactComponent as MoreInner } from '@Icons/ri_more-line.svg';
import { ReactComponent as HeartInner } from '@Icons/solar_heart-broken.svg';
import { ReactComponent as HeartFillInner } from '@Icons/solar_heart-fill.svg';
import { ReactComponent as DeleteInner } from '@Icons/typcn_delete.svg';
import { ReactComponent as SettingInner } from '@Icons/uil_setting.svg';
import { ReactComponent as LogoInner } from '../Icons/complimate-logo.svg';
import { ReactComponent as GiveHeartInner } from '@Icons/GiveHeart.svg';
import { ReactComponent as TakenHeartInner } from '@Icons/TakenHeart.svg';

// const icons = [
//   { name: 'Google', Icon: GoogleIconInner },
//   { name: 'Email', Icon: EmailIconInner },
//   { name: 'Profile', Icon: ProfileInner },
//   { name: 'Comment', Icon: CommentInner },
//   { name: 'Refresh', Icon: RefreshInner },
//   { name: 'Sort', Icon: SortInner },
//   { name: 'Left', Icon: LeftIconInner },
//   { name: 'Home', Icon: HomeInner },
//   { name: 'Password', Icon: PasswordIconInner },
//   { name: 'Write', Icon: WriteInner },
//   { name: 'Hamburger', Icon: HamburgerInner },
//   { name: 'More', Icon: MoreInner },
//   { name: 'Heart', Icon: HeartInner },
//   { name: 'HeartFill', Icon: HeartFillInner },
//   { name: 'Delete', Icon: DeleteInner },
//   { name: 'Setting', Icon: SettingInner },
//   { name: 'Logo', Icon: LogoInner },
// ];

const returnIcon = (Icon: ComponentType<SVGProps<SVGSVGElement>>) =>
  styled(Icon)<{ color?: string; width?: string; height?: string }>(
    {
      width: sizes.icon.small,
      height: sizes.icon.small,
    },
    ({ theme, color, width, height }) => ({
      color: color || theme.colors.icon.default,
      width: width || sizes.icon.small,
      height: height || sizes.icon.small,
    })
  );

export const Google = returnIcon(GoogleIconInner);
export const Email = returnIcon(EmailIconInner);
export const Profile = returnIcon(ProfileInner);
export const Comment = returnIcon(CommentInner);
export const Refresh = returnIcon(RefreshInner);
export const Sort = returnIcon(SortInner);
export const Left = returnIcon(LeftIconInner);
export const Home = returnIcon(HomeInner);
export const Password = returnIcon(PasswordIconInner);
export const Write = returnIcon(WriteInner);
export const Hamburger = returnIcon(HamburgerInner);
export const More = returnIcon(MoreInner);
export const Heart = returnIcon(HeartInner);
export const HeartFill = returnIcon(HeartFillInner);
export const Delete = returnIcon(DeleteInner);
export const Setting = returnIcon(SettingInner);
export const Logo = returnIcon(LogoInner);
export const GiveHeart = returnIcon(GiveHeartInner);
export const TakenHeart = returnIcon(TakenHeartInner);

// export {...IconList};

// export const { ...Object.entries() icons.map((icon) => ({[icon.toString()]: returnIcon(icon)})) }

// export const Email = returnIcon(EmailIconInner);

// export const Password = styled(PasswordIconInner)(
//   {
//     width: sizes.icon.small,
//     height: sizes.icon.small,
//   },
//   ({ theme }) => ({
//     color: theme.colors.icon.default,
//   })
// );

// export const Left = styled(LeftIconInner)(
//   {
//     width: sizes.icon.small,
//     height: sizes.icon.small,
//   },
//   ({ theme }) => ({
//     color: theme.colors.icon.default,
//   })
// );

// export const Logo = styled(LogoInner)(
//   {
//     width: sizes.logo.default,
//     height: sizes.logo.default,
//   },
//   ({ theme, width, height }) => ({ color: theme.colors.icon.default, width, height })
// );

// export const Google = styled(GoogleIconInner)(
//   {
//     width: sizes.icon.default,
//     height: sizes.icon.default,
//   },
//   ({ theme, width, height }) => ({ color: theme.colors.icon.default, width, height })
// );

// export const Hamburger = styled(HamburgerInner)(
//   {
//     width: sizes.icon.default,
//     height: sizes.icon.default,
//   },
//   ({ theme, width, height }) => ({ color: theme.colors.icon.default, width, height })
// );

// export const Write = styled(WriteInner)(
//   {
//     width: sizes.icon.default,
//     height: sizes.icon.default,
//   },
//   ({ theme, width, height }) => ({ color: theme.colors.icon.default, width, height })
// );

// export const Heart = styled(HeartInner)(
//   {
//     width: sizes.icon.default,
//     height: sizes.icon.default,
//   },
//   ({ theme, width, height }) => ({ color: theme.colors.icon.default, width, height })
// );

// export const HeartFilled = styled(HeartFillInner)(
//   {
//     width: sizes.icon.default,
//     height: sizes.icon.default,
//   },
//   ({ theme, width, height }) => ({ color: theme.colors.icon.default, width, height })
// );

// export const More = styled(MoreInner)(
//   {
//     width: sizes.icon.default,
//     height: sizes.icon.default,
//   },
//   ({ theme, width, height }) => ({ color: theme.colors.icon.default, width, height })
// );

// export const Comment = styled(CommentInner)(
//   {
//     width: sizes.icon.default,
//     height: sizes.icon.default,
//   },
//   ({ theme, width, height }) => ({ color: theme.colors.icon.default, width, height })
// );

// export const Refresh = styled(RefreshInner)(
//   {
//     width: sizes.icon.default,
//     height: sizes.icon.default,
//   },
//   ({ theme, width, height }) => ({ color: theme.colors.icon.default, width, height })
// );

// export const Setting = styled(SettingInner)(
//   {
//     width: sizes.icon.default,
//     height: sizes.icon.default,
//   },
//   ({ theme, width, height }) => ({ color: theme.colors.icon.default, width, height })
// );

// export const Profile = styled(ProfileInner)(
//   {
//     width: sizes.icon.default,
//     height: sizes.icon.default,
//   },
//   ({ theme, width, height }) => ({ color: theme.colors.icon.default, width, height })
// );

// export const Home = styled(HomeInner)(
//   {
//     width: sizes.icon.default,
//     height: sizes.icon.default,
//   },
//   ({ theme, width, height }) => ({ color: theme.colors.icon.default, width, height })
// );

// export const Sort = styled(SortInner)(
//   {
//     width: sizes.icon.default,
//     height: sizes.icon.default,
//   },
//   ({ theme, width, height }) => ({ color: theme.colors.icon.default, width, height })
// );

// export const Delete = styled(DeleteInner)(
//   {
//     width: sizes.icon.default,
//     height: sizes.icon.default,
//   },
//   ({ theme, width, height }) => ({ color: theme.colors.icon.default, width, height })
// );
