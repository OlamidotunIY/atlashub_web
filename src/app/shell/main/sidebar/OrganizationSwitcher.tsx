import { useMe, useSwitchOrganization } from '@/features/authentication';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/ui';
import { BuildingsIcon, CaretUpDownIcon, CheckIcon } from '@phosphor-icons/react';

export function OrganizationSwitcher() {
  const { data: user } = useMe();
  const { mutate: switchOrganization, isPending } = useSwitchOrganization();
  const { isMobile } = useSidebar();
  const organizations = user?.organizations ?? [];
  const activeOrganization = organizations.find((organization) => organization.id === user?.activeOrganizationId)
    ?? organizations[0];

  if (!activeOrganization) return null;

  const selectOrganization = (organizationId: number) => {
    if (organizationId !== activeOrganization.id) {
      switchOrganization({ organizationId });
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size="lg" disabled={isPending} />}>
            <Avatar className="rounded-lg">
              <AvatarImage src={activeOrganization.logoUrl} alt={activeOrganization.businessName} />
              <AvatarFallback className="rounded-lg"><BuildingsIcon /></AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{activeOrganization.businessName}</span>
              <span className="truncate text-xs">{activeOrganization.baseCurrency ?? 'Workspace'}</span>
            </div>
            <CaretUpDownIcon className="ml-auto" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" side={isMobile ? 'bottom' : 'right'} sideOffset={4}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Your organizations</DropdownMenuLabel>
              {organizations.map((organization) => (
                <DropdownMenuItem
                  key={organization.id}
                  disabled={isPending}
                  onClick={() => selectOrganization(organization.id)}
                >
                  <Avatar size="sm" className="rounded-md">
                    <AvatarImage src={organization.logoUrl} alt={organization.businessName} />
                    <AvatarFallback className="rounded-md"><BuildingsIcon /></AvatarFallback>
                  </Avatar>
                  <span className="flex-1 truncate">{organization.businessName}</span>
                  {organization.id === activeOrganization.id ? <CheckIcon /> : null}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>Add organization coming soon</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
