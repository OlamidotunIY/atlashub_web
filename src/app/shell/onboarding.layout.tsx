import { useAuthAccount, authStore, useLogout } from '@/features/authentication';
import { Avatar, AvatarFallback, AvatarImage, Button } from '@/shared/ui';
import { SignOut } from '@phosphor-icons/react';
import { Outlet } from 'react-router-dom';

export function OnboardingLayout() {
  const { data: user } = useAuthAccount();
  const { clear, jti } = authStore();
  const { mutateAsync: logout } = useLogout();

  const handleLogout = async () => {
    if (jti) {
      await logout().catch(() => {});
    }
    clear();
  };

  const initials =
    (user?.firstName?.charAt(0) || '') + (user?.lastName?.charAt(0) || '');

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      {/* Top Header - Consistent across all onboarding steps */}
      <header className="w-full border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        {/* Top Left: Authenticated user information (flex with avatar container + name/email container) */}
        <div className="flex items-center gap-3.5">
          {/* Container 1: Avatar */}
          <div className="shrink-0">
            <Avatar className="size-10 sm:size-11 border border-border/80 shadow-xs">
              <AvatarImage src={user?.imageUrl || undefined} alt={`${user?.firstName} ${user?.lastName}`} />
              <AvatarFallback className="text-sm font-bold bg-primary/10 text-primary">
                {initials || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Container 2: Name and Email */}
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold tracking-tight text-foreground leading-tight">
              {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Authenticated User'}
            </span>
            <span className="text-xs text-muted-foreground leading-tight mt-0.5 truncate max-w-[200px] sm:max-w-xs">
              {user?.email || 'Logged in'}
            </span>
          </div>
        </div>

        {/* Top Right: Logout Button */}
        <div>
          <Button
            type="button"
            variant="outline"
            onClick={handleLogout}
            className="h-9 px-3.5 text-xs font-semibold rounded-lg border-border hover:border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors"
          >
            <SignOut className="mr-1.5 size-4" weight="bold" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
