import { AUTH_WEB_URL, MERCHANT_ROUTES } from '@/constants';
import { authStore, useMe } from '@/features/authentication';
import { SplashScreen } from '@/shared/composites';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export function AuthGuard({
  children,
  fallback: _fallback,
}: {
  children: React.ReactNode;
  fallback?: string;
}) {
  const isHydrated = authStore((state) => state.isHydrated);
  const isAuthenticated = authStore((state) => state.isAuthenticated());
  const location = useLocation();
  const { data, isPending, isError } = useMe({
    enabled: isHydrated && isAuthenticated,
  });

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      const returnTo = `${window.location.origin}/#/auth/callback`;
      window.location.href = `${AUTH_WEB_URL}/login?return_to=${encodeURIComponent(returnTo)}`;
    }
  }, [isHydrated, isAuthenticated]);

  if (!isHydrated) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <SplashScreen message="Redirecting to Atlas Auth..." />;
  }

  // A 401 is refreshed and retried by the HTTP interceptor. The guard only
  // consumes the resulting authenticated user state.
  if (isPending) {
    return <SplashScreen />;
  }

  if (isError || !data) {
    authStore.getState().clear();
    const returnTo = `${window.location.origin}/#/auth/callback`;
    window.location.href = `${AUTH_WEB_URL}/login?return_to=${encodeURIComponent(returnTo)}`;
    return <SplashScreen message="Redirecting to Atlas Auth..." />;
  }

  const organizations = data.organizations ?? [];
  const hasActiveOrg = Boolean(data.activeOrganization || organizations.length > 0);
  const isOnboardingRoute =
    location.pathname.startsWith('/onboarding') ||
    location.pathname.startsWith('/invite');

  // If the user belongs to zero organizations, route them to Create Organization
  if (!hasActiveOrg && !isOnboardingRoute) {
    return <Navigate to={MERCHANT_ROUTES.ONBOARDING_ORGANIZATION} replace />;
  }

  return <>{children}</>;
}
