import { MERCHANT_ROUTES } from '@/constants';
import { authStore, useMe } from '@/features/authentication';
import { SplashScreen } from '@/shared/composites';
import { Navigate, useLocation } from 'react-router-dom';

export function AuthGuard({
  children,
  fallback,
  requireOnboarding = true,
}: {
  children: React.ReactNode;
  fallback: string;
  requireOnboarding?: boolean;
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

  if (requireOnboarding && data.onboardingStatus === 'NO_ORG') {
    return <Navigate to={MERCHANT_ROUTES.ONBOARDING_ORGANIZATION} replace />;
  }

  if (
    !requireOnboarding &&
    data.onboardingStatus === 'COMPLETED' &&
    location.pathname === MERCHANT_ROUTES.ONBOARDING_ORGANIZATION
  ) {
    return <Navigate to={MERCHANT_ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
}
