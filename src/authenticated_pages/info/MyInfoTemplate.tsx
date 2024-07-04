import SidebarMenuItem from 'authenticated_pages/shared/components/SidebarMenuItem';
import SidebarMenus from 'authenticated_pages/shared/components/SidebarMenus';
import SidebarTemplate from 'authenticated_pages/shared/components/SidebarTemplate';
import useAuthUserAndMenu from 'global_shared/hooks/useAuthUserAndMenu';
import { useEffect, useState } from 'react';

const MyInfoTemplate = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const [sidebarMenuExpended, setSidebarMenuExpended] = useState(false);
  const { authUser, GetMenu } = useAuthUserAndMenu();
  const meInfoMenu = GetMenu('Me');
  const familyAndRelativesInfoMenu = GetMenu('Family And Relatives');
  const cardsInfoMenu = GetMenu('Cards');
  const DependentsAccount = GetMenu('Dependents Account');
  const beneficiaryMenu = GetMenu('Beneficiaries');

  if (authUser != null) {
    return (
      <>
        <SidebarTemplate
          sidebarMenuTitle="Info"
          sidebarMenuExpended={sidebarMenuExpended}
          setSidebarMenuExpended={setSidebarMenuExpended}
        >
          <SidebarMenus>
            <SidebarMenuItem
              IsNewMenu={meInfoMenu?.IsNewMenu}
              menuIcon={meInfoMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={meInfoMenu?.MenuName!}
              menuUrlSegment={'my_info'}
              rolePermissionIds={meInfoMenu?.RolePermissionIds!}
              MenuObject={meInfoMenu}
            />
            <SidebarMenuItem
              IsNewMenu={familyAndRelativesInfoMenu?.IsNewMenu}
              menuIcon={familyAndRelativesInfoMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={familyAndRelativesInfoMenu?.MenuName!}
              menuUrlSegment={'family_and_relatives'}
              rolePermissionIds={familyAndRelativesInfoMenu?.RolePermissionIds!}
              MenuObject={familyAndRelativesInfoMenu}
            />
            <SidebarMenuItem
              IsNewMenu={cardsInfoMenu?.IsNewMenu}
              menuIcon={cardsInfoMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={cardsInfoMenu?.MenuName!}
              menuUrlSegment={'card'}
              rolePermissionIds={cardsInfoMenu?.RolePermissionIds}
              MenuObject={cardsInfoMenu}
            />
            <SidebarMenuItem
              IsNewMenu={DependentsAccount?.IsNewMenu}
              menuIcon={DependentsAccount?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={DependentsAccount?.MenuName!}
              menuUrlSegment={'dependents_account'}
              rolePermissionIds={DependentsAccount?.RolePermissionIds}
              MenuObject={DependentsAccount}
            />
            <SidebarMenuItem
              IsNewMenu={beneficiaryMenu?.IsNewMenu}
              menuIcon={beneficiaryMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={beneficiaryMenu?.MenuName!}
              menuUrlSegment={'beneficiary_Management'}
              rolePermissionIds={beneficiaryMenu?.RolePermissionIds!}
              MenuObject={beneficiaryMenu}
            />
          </SidebarMenus>
        </SidebarTemplate>
      </>
    );
  } else {
    return null;
  }
};

export default MyInfoTemplate;
