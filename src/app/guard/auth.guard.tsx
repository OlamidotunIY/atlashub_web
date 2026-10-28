import { MERCHANT_ROUTES } from '@/constants';
import { authStore, useMe } from '@/features/authentication';
import { SplashScreen } from '@/shared/composites';
import { Navigate, useLocation } from 'react-router-dom';

export function AuthGuard({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: string;
}) {
  const isHydrated = authStore((state) => state.isHydrated);
  const isAuthenticated = authStore((state) => state.isAuthenticated());
  const location = useLocation();
  const { data, isPending, isError } = useMe({
    enabled: isHydrated && isAuthenticated,
  });

  if (!isHydrated) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={fallback} state={{ from: location }} replace />;
  }

  // A 401 is refreshed and retried by the HTTP interceptor. The guard only
  // consumes the resulting authenticated user state.
  if (isPending) {
    return <SplashScreen />;
  }

  if (isError || !data) {
    return <Navigate to={fallback} state={{ from: location }} replace />;
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
