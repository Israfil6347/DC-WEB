import SidebarMenuItem from 'authenticated_pages/shared/components/SidebarMenuItem';
import SidebarMenus from 'authenticated_pages/shared/components/SidebarMenus';
import SidebarTemplate from 'authenticated_pages/shared/components/SidebarTemplate';
import useAuthUserAndMenu from 'global_shared/hooks/useAuthUserAndMenu';
import { useEffect, useState } from 'react';

const CounterTemplate = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  const [sidebarMenuExpended, setSidebarMenuExpended] = useState(false);
  const { authUser, GetMenu } = useAuthUserAndMenu();
  const AgmCounterMenu = GetMenu('Counter');

  if (authUser != null) {
    return (
      <>
        <SidebarTemplate
          sidebarMenuTitle={'Agm Counter'}
          sidebarMenuExpended={sidebarMenuExpended}
          setSidebarMenuExpended={setSidebarMenuExpended}
        >
          <SidebarMenus>
            <SidebarMenuItem
              menuIcon={AgmCounterMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={AgmCounterMenu?.MenuName!}
              menuUrlSegment={'agm_counter'}
              rolePermissionIds={AgmCounterMenu?.RolePermissionIds}
              MenuObject={AgmCounterMenu}
            />
          </SidebarMenus>
        </SidebarTemplate>
      </>
    );
  } else {
    return null;
  }
};

export default CounterTemplate;
