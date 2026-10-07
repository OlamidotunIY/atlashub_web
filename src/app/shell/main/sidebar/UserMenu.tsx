import { authRepository, authStore, meQueryKeys, useMe } from '@/features/authentication';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/ui';
import { queryClient } from '@/shared/api';
import { MERCHANT_ROUTES } from '@/constants';
import { CaretUpDownIcon, GearIcon, SignOutIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function UserMenu() {
  const { data: user } = useMe();
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'AtlasHub user';
  const initials = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .map((value) => value?.charAt(0).toUpperCase())
    .join('') || 'AH';

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await authRepository.logout();
    } finally {
      authStore.getState().clear();
      queryClient.removeQueries({ queryKey: meQueryKeys.details() });
      navigate(MERCHANT_ROUTES.LOGIN, { replace: true });
      setIsLoggingOut(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size="lg" disabled={isLoggingOut} />}>
            <Avatar className="rounded-lg">
              <AvatarImage src={user?.imageUrl} alt={name} />
              <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{name}</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
            <CaretUpDownIcon className="ml-auto" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" side={isMobile ? 'bottom' : 'right'} sideOffset={4}>
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(MERCHANT_ROUTES.SETTINGS)}>
              <GearIcon />
              Account settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" disabled={isLoggingOut} onClick={logout}>
              <SignOutIcon />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
