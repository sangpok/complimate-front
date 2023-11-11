import type { SettingList } from './SettingPage.types';

export const settingList: SettingList = [
  [
    {
      name: '닉네임',
      path: '/nickname',
      placeholder: '나는야 김재민',
    },
    {
      name: '프로필 사진 및 자기소개',
      path: '/introduce',
      placeholder: null,
    },
  ],
  [
    {
      name: '핸들ID',
      path: '/handle_id',
      placeholder: '@im_jmjm',
    },
    {
      name: '비밀번호 변경',
      path: '/password',
      placeholder: null,
    },
  ],
  [
    {
      name: '테마 설정',
      path: '/theme',
      placeholder: '라이트',
    },
    {
      name: '폰트 크기 설정',
      path: '/font_size',
      placeholder: '시스템 설정',
    },
  ],
  [
    {
      name: '로그아웃',
      path: '/logout',
      placeholder: null,
    },
  ],
  [
    {
      name: '회원탈퇴',
      path: '/resign',
      placeholder: null,
    },
  ],
];
