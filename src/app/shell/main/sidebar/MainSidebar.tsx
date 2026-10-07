import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/shared/ui';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { SidebarNavigation, SidebarProductNavigation } from './SidebarNavigation';
import { SidebarUtilityNavigation } from './SidebarUtilityNavigation';
import { UserMenu } from './UserMenu';

export function MainSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <OrganizationSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <SidebarNavigation />
        <SidebarProductNavigation />
      </SidebarContent>

      <SidebarFooter>
        <SidebarUtilityNavigation />
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
