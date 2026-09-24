import { MERCHANT_ROUTES } from '@/constants';
import { authStore, useMe, useRefreshToken } from '@/features/authentication';
import { SplashScreen } from '@/shared/composites';
import { toast } from '@/shared/hooks';
import { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export function AuthGuard({
  children,
  fallback,
  requireOnboarding = true,
}: {
  children: React.ReactNode;
  fallback: string;
  requireOnboarding?: boolean;
})
{
  const isHydrated = authStore((state) => state.isHydrated);
  const { isAuthenticated, refreshToken, clear, setTokens, isExpired } = authStore();
  const location = useLocation();

  const { mutateAsync: refresh, isPending: isRefreshing, isError: refreshFailed } = useRefreshToken();

  // Only run the refresh attempt once, not on every render
  const hasAttemptedRefresh = useRef(false);

  useEffect(() =>
  {
    if (
      isHydrated &&
      isAuthenticated() &&
      isExpired() &&
      refreshToken &&
      !hasAttemptedRefresh.current
    )
    {
      hasAttemptedRefresh.current = true;
      refresh(refreshToken)
        .then((tokenPair) =>
        {
          setTokens(
            tokenPair.accessToken,
            tokenPair.refreshToken,
            tokenPair.accessExpiresAt,
          );
        })
        .catch(() =>
        {
          clear();
          toast.add({
            type: 'error',
            title: 'Session Expired',
            description: 'Your session has expired. Please log in again.',
            priority: 'high',
          });
        });
    }
  }, [isHydrated, isAuthenticated, isExpired, refreshToken, refresh, setTokens, clear]);

  // Fetch user info once token is confirmed valid (not expired, or refresh completed)
  const shouldFetchMe = isHydrated && isAuthenticated() && !isExpired && !isRefreshing;

  const { data, isFetching, isError: meError, error } = useMe({
    enabled: shouldFetchMe,
  });

  useEffect(() =>
  {
    if (meError)
    {
      clear();
      toast.add({
        type: 'error',
        title: 'Session Error',
        description: error?.message || 'Your session is invalid. Please log in again.',
        priority: 'high',
      });
    }
  }, [meError, clear, error]);

  // 1. Not hydrated yet — show splash while reading storage
  if (!isHydrated)
  {
    return <SplashScreen />;
  }

  // 2. No token at all — redirect to login
  if (!isAuthenticated)
  {
    return <Navigate to={fallback} state={{ from: location }} replace />;
  }

  // 3. Token is expired — waiting for refresh or refresh failed
  if (isExpired())
  {
    if (refreshFailed)
    {
      return <Navigate to={fallback} state={{ from: location }} replace />;
    }
    return <SplashScreen />;
  }

  // 4. Fetching /me or session error
  if (isFetching || !data)
  {
    return <SplashScreen />;
  }

  if (meError)
  {
    return <Navigate to={fallback} state={{ from: location }} replace />;
  }

  // 5. Onboarding enforcement
  if (requireOnboarding && data.onboardingStatus === 'NO_ORG')
  {
    return <Navigate to={MERCHANT_ROUTES.ONBOARDING_ORGANIZATION} replace />;
  }

  if (
    !requireOnboarding &&
    data.onboardingStatus === 'COMPLETED' &&
    location.pathname === MERCHANT_ROUTES.ONBOARDING_ORGANIZATION
  )
  {
    return <Navigate to={MERCHANT_ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
}
