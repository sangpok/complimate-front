import { SideBarMenuProp } from './SidebarMenu.types';

import * as Layout from '@Layouts/DefaultLayout';
import * as Dialog from '@radix-ui/react-dialog';
import * as C from './SidebarMenu.component';
import * as S from './SidebarMenu.styled';

import { sidebarMenuList } from './SidebarMenu.list';

export const SideBarMenu = ({
  container,
  onBackClick,
  onSettingClick,
  onMenuItemClick,
  overlayScope,
  contentScope,
}: SideBarMenuProp) => {
  return (
    <Dialog.Portal container={container.current}>
      <S.DialogOverlay ref={overlayScope} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <S.DialogContent ref={contentScope} initial={{ x: '-100%' }} animate={{ x: 0 }}>
          <S.MenuInner>
            <Layout.Head>
              <C.Head onBackClick={onBackClick} onSettingClick={onSettingClick} />
            </Layout.Head>

            <Layout.Body>
              <C.List list={sidebarMenuList} currentPath="/app" onMenuItemClick={onMenuItemClick} />
            </Layout.Body>

            <Layout.Foot>
              <C.MiniLogo />
            </Layout.Foot>
          </S.MenuInner>
        </S.DialogContent>
      </S.DialogOverlay>
    </Dialog.Portal>
  );
};
