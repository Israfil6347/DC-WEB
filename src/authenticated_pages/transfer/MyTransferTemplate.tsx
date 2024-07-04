import SidebarMenuItem from 'authenticated_pages/shared/components/SidebarMenuItem';
import SidebarMenus from 'authenticated_pages/shared/components/SidebarMenus';
import SidebarTemplate from 'authenticated_pages/shared/components/SidebarTemplate';
import useAuthUserAndMenu from 'global_shared/hooks/useAuthUserAndMenu';
import { useEffect, useState } from 'react';
const MyTransferTemplate = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  const { authUser, GetMenu } = useAuthUserAndMenu();
  const [sidebarMenuExpended, setSidebarMenuExpended] = useState(false);
  const transferWithinDhakaCreditMenu = GetMenu('Transfer Within Dhaka Credit');
  const transferToOtherCooperativesMenu = GetMenu(
    'Transfer To Other Cooperatives'
  );
  // const bankTransferRequestMenu = GetMenu('Bank Transfer Request');
  const bKashTransferRequestMenu = GetMenu('Transfer To bKash');
  const transferRequestStatusMenu = GetMenu('Transfer Request Status');
  const bankTransferRequestMenu = GetMenu('Bank To Dhaka Credit');

  if (authUser != null) {
    return (
      <>
        <SidebarTemplate
          sidebarMenuTitle={'Transfer'}
          sidebarMenuExpended={sidebarMenuExpended}
          setSidebarMenuExpended={setSidebarMenuExpended}
        >
          <SidebarMenus>
            <SidebarMenuItem
              IsNewMenu={bKashTransferRequestMenu?.IsNewMenu}
              menuIcon={bKashTransferRequestMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={bKashTransferRequestMenu?.MenuName!}
              menuUrlSegment={'bKash_Transfer_Request'}
              rolePermissionIds={bKashTransferRequestMenu?.RolePermissionIds}
              MenuObject={bKashTransferRequestMenu}
            />
            <SidebarMenuItem
              IsNewMenu={transferWithinDhakaCreditMenu?.IsNewMenu}
              menuIcon={transferWithinDhakaCreditMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={transferWithinDhakaCreditMenu?.MenuName!}
              menuUrlSegment={'transfer_within_dhaka_credit'}
              rolePermissionIds={
                transferWithinDhakaCreditMenu?.RolePermissionIds
              }
              MenuObject={transferWithinDhakaCreditMenu}
            />
            {/* <SidebarMenuItem
              IsNewMenu={throughBankMenu?.IsNewMenu}
              menuIcon={throughBankMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={throughBankMenu?.MenuName!}
              menuUrlSegment={'deposit_bank'}
              rolePermissionIds={throughBankMenu?.RolePermissionIds}
              MenuObject={throughBankMenu}
            /> */}
            <SidebarMenuItem
              IsNewMenu={bankTransferRequestMenu?.IsNewMenu}
              menuIcon={bankTransferRequestMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={bankTransferRequestMenu?.MenuName!}
              menuUrlSegment={'deposit_bank'}
              rolePermissionIds={bankTransferRequestMenu?.RolePermissionIds}
              MenuObject={bankTransferRequestMenu}
            />
            <SidebarMenuItem
              IsNewMenu={transferToOtherCooperativesMenu?.IsNewMenu}
              menuIcon={transferToOtherCooperativesMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={transferToOtherCooperativesMenu?.MenuName!}
              menuUrlSegment={'transfer_To_Other_Cooperatives'}
              rolePermissionIds={
                transferToOtherCooperativesMenu?.RolePermissionIds
              }
              MenuObject={transferToOtherCooperativesMenu}
            />

            <SidebarMenuItem
              IsNewMenu={transferRequestStatusMenu?.IsNewMenu}
              menuIcon={transferRequestStatusMenu?.MfsIcon}
              isSidebarMenuExpended={sidebarMenuExpended}
              menuTitle={transferRequestStatusMenu?.MenuName!}
              menuUrlSegment={'transfer_Request_Status'}
              rolePermissionIds={transferRequestStatusMenu?.RolePermissionIds}
              MenuObject={transferRequestStatusMenu}
            />
          </SidebarMenus>
        </SidebarTemplate>
      </>
    );
  } else {
    return null;
  }
};

export default MyTransferTemplate;
