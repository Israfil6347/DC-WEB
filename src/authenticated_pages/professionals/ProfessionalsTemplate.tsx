import SidebarMenuItem from 'authenticated_pages/shared/components/SidebarMenuItem';
import SidebarMenus from 'authenticated_pages/shared/components/SidebarMenus';
import SidebarTemplate from 'authenticated_pages/shared/components/SidebarTemplate';
import useAuthUserAndMenu from 'global_shared/hooks/useAuthUserAndMenu';
import { useEffect, useState } from 'react';

const ProfessionalsTemplate = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  const [sidebarMenuExpended, setSidebarMenuExpended] = useState(false);
  const { authUser, GetMenu } = useAuthUserAndMenu();
  const leaveApplicationMenu = GetMenu('Leave Application');
  const fallbackRequestsMenu = GetMenu('Fallback Acceptance');
  const leaveHistoryMenu = GetMenu('Leave History');
  const attendancesMenu = GetMenu('Attendances');
  const woooMenu = GetMenu('Working Out of Office Application');
  const woooHistoryMenu = GetMenu('Working Out of Office History');
  const todaysPunchMenu = GetMenu(`Todays Punch`);

  console.log(authUser);

  if (authUser != null) {
    return (
      <>
        <SidebarTemplate
          sidebarMenuTitle={'Personnel'}
          sidebarMenuExpended={sidebarMenuExpended}
          setSidebarMenuExpended={setSidebarMenuExpended}
        >
          <SidebarMenus>
            <SidebarMenuItem
              menuIcon={leaveApplicationMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={leaveApplicationMenu?.MenuName!}
              menuUrlSegment={'leave_application'}
              rolePermissionIds={leaveApplicationMenu?.RolePermissionIds}
              MenuObject={leaveApplicationMenu}
            />
            <SidebarMenuItem
              menuIcon={fallbackRequestsMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={fallbackRequestsMenu?.MenuName!}
              menuUrlSegment={'fallback_requests'}
              rolePermissionIds={fallbackRequestsMenu?.RolePermissionIds}
              MenuObject={fallbackRequestsMenu}
            />
            <SidebarMenuItem
              menuIcon={leaveHistoryMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={leaveHistoryMenu?.MenuName!}
              menuUrlSegment={'leave_histories'}
              rolePermissionIds={leaveHistoryMenu?.RolePermissionIds}
              MenuObject={leaveHistoryMenu}
            />
            <SidebarMenuItem
              menuIcon={attendancesMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={attendancesMenu?.MenuName!}
              menuUrlSegment={'attendances'}
              rolePermissionIds={attendancesMenu?.RolePermissionIds}
              MenuObject={attendancesMenu}
            />
            <SidebarMenuItem
              menuIcon={woooMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={woooMenu?.MenuName!}
              menuUrlSegment={'wooo_application'}
              rolePermissionIds={woooMenu?.RolePermissionIds}
              MenuObject={woooMenu}
            />
            <SidebarMenuItem
              menuIcon={woooHistoryMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={woooHistoryMenu?.MenuName!}
              menuUrlSegment={'wooo_histories'}
              rolePermissionIds={woooHistoryMenu?.RolePermissionIds}
              MenuObject={woooHistoryMenu}
            />
            <SidebarMenuItem
              menuIcon={todaysPunchMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={todaysPunchMenu?.MenuName!}
              menuUrlSegment={'todays_punch'}
              rolePermissionIds={todaysPunchMenu?.RolePermissionIds}
              MenuObject={todaysPunchMenu}
            />
          </SidebarMenus>
        </SidebarTemplate>
      </>
    );
  } else {
    return null;
  }
};

export default ProfessionalsTemplate;
