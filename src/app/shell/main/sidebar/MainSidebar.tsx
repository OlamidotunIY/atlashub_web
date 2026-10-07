import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/shared/ui';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { SidebarNavigation } from './SidebarNavigation';
import { UserMenu } from './UserMenu';

export function MainSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <OrganizationSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <SidebarNavigation />
      </SidebarContent>

      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
