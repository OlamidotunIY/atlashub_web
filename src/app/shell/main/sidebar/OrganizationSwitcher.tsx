import { MERCHANT_ROUTES } from '@/constants';
import { useMe, useSwitchOrganization } from '@/features/authentication';
import { useNavigate } from 'react-router-dom';
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
import { CaretRightIcon, CheckIcon, PlusIcon } from '@phosphor-icons/react';

export function OrganizationSwitcher() {
  const navigate = useNavigate();
  const { data: user } = useMe();
  const { mutate: switchOrganization, isPending } = useSwitchOrganization();
  const { isMobile } = useSidebar();
  const organizations = user?.organizations ?? [];
  const activeOrganization = user?.activeOrganization ?? organizations[0];

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
          <DropdownMenuTrigger render={<SidebarMenuButton size="lg" className="hover:!bg-transparent hover:!text-sidebar-foreground active:!bg-transparent active:!text-sidebar-foreground data-open:hover:!bg-transparent data-popup-open:!bg-transparent" disabled={isPending} />}>
            <Avatar className="rounded-sm">
              <AvatarImage src={activeOrganization.logoUrl} alt={activeOrganization.businessName} />
              <AvatarFallback className="rounded-sm bg-foreground font-semibold text-background">
                {activeOrganization.businessName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{activeOrganization.businessName}</span>
              <span className="truncate text-xs">{user?.activeOrganizationRole ?? 'Member'}</span>
            </div>
            <CaretRightIcon className="ml-auto" />
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
                    <AvatarFallback className="rounded-md bg-foreground font-semibold text-background">
                      {organization.businessName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex-1 truncate">{organization.businessName}</span>
                  {organization.id === activeOrganization.id ? <CheckIcon /> : null}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate(MERCHANT_ROUTES.ONBOARDING_ORGANIZATION)}
              >
                <div className="size-6 rounded-md border border-dashed border-border flex items-center justify-center text-muted-foreground mr-1">
                  <PlusIcon className="size-3.5" />
                </div>
                <span>Add organization</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
