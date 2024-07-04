import SidebarMenuItem from 'authenticated_pages/shared/components/SidebarMenuItem';
import SidebarMenus from 'authenticated_pages/shared/components/SidebarMenus';
import SidebarTemplate from 'authenticated_pages/shared/components/SidebarTemplate';
import useAuthUserAndMenu from 'global_shared/hooks/useAuthUserAndMenu';
import { useEffect, useState } from 'react';

const MyDepositsTemplate = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  const [sidebarMenuExpended, setSidebarMenuExpended] = useState(false);
  const { authUser, GetMenu } = useAuthUserAndMenu();
  const depositNowMenu = GetMenu('Deposit Now');
  const depositLaterMenu = GetMenu('Deposit Later');
  const throughBkashMenu = GetMenu('Deposit From bKash');
  const depositStatusMenu = GetMenu('Deposit Request Status');
  const eReceiptMenu = GetMenu('eReceipt');

  if (authUser != null) {
    return (
      <>
        <SidebarTemplate
          sidebarMenuExpended={sidebarMenuExpended}
          setSidebarMenuExpended={setSidebarMenuExpended}
          sidebarMenuTitle={'Deposit'}
        >
          <SidebarMenus>
            <SidebarMenuItem
              IsNewMenu={depositNowMenu?.IsNewMenu}
              menuIcon={depositNowMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={depositNowMenu?.MenuName!}
              menuUrlSegment={'deposit_now'}
              rolePermissionIds={depositNowMenu?.RolePermissionIds}
              MenuObject={depositNowMenu}
            />
            <SidebarMenuItem
              IsNewMenu={depositNowMenu?.IsNewMenu}
              menuIcon={depositLaterMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={depositLaterMenu?.MenuName!}
              menuUrlSegment={'deposit_later'}
              rolePermissionIds={depositLaterMenu?.RolePermissionIds}
              MenuObject={depositLaterMenu}
            />

            <SidebarMenuItem
              IsNewMenu={throughBkashMenu?.IsNewMenu}
              menuIcon={throughBkashMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={throughBkashMenu?.MenuName!}
              menuUrlSegment={'through_bkash'}
              rolePermissionIds={throughBkashMenu?.RolePermissionIds}
              MenuObject={throughBkashMenu}
            />
            <SidebarMenuItem
              IsNewMenu={depositStatusMenu?.IsNewMenu}
              menuIcon={depositStatusMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={depositStatusMenu?.MenuName!}
              menuUrlSegment={'deposit_request_status'}
              rolePermissionIds={depositStatusMenu?.RolePermissionIds}
              MenuObject={depositStatusMenu}
            />
            <SidebarMenuItem
              IsNewMenu={eReceiptMenu?.IsNewMenu}
              menuIcon={eReceiptMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={eReceiptMenu?.MenuName!}
              menuUrlSegment={'e_receipt'}
              rolePermissionIds={eReceiptMenu?.RolePermissionIds}
              MenuObject={eReceiptMenu}
            />
          </SidebarMenus>
        </SidebarTemplate>
      </>
    );
  } else {
    return null;
  }
};

export default MyDepositsTemplate;
