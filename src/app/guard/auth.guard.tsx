import { MERCHANT_ROUTES } from '@/constants';
import { authStore, useAuthAccount, useLogout } from '@/features/authentication';
import { SplashScreen } from '@/shared/composites';
import { toast } from '@/shared/hooks';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export function AuthGuard({ children, fallback, requireOnboarding = true }: { children: React.ReactNode; fallback: string; requireOnboarding?: boolean })
{
  const isHydrated = authStore(state => state.isHydrated);
  const isAuthenticated = authStore(state => state.isAuthenticated());
  const jti = authStore(state => state.jti);
  const clear = authStore(state => state.clear);
  const location = useLocation();

  const { mutateAsync: logout } = useLogout();

  const { data, isFetching, isError, error, isSuccess } = useAuthAccount({
    enabled: isHydrated && isAuthenticated
  });

  useEffect(() =>
  {
    if (isError)
    {
      if (jti)
      {
        logout(jti).catch(() => { });
      }
      clear();
      // Ensure the toast takes high priority and stays visible for 10s
      toast.add({
        type: 'error',
        title: 'Session Error',
        description: error?.message || 'Your session is invalid or has expired. Please log in again.',
        priority: 'high',
      })
    }
  }, [isError, jti, logout, clear, error]);

  if (!isHydrated)
  {
    return <SplashScreen />;
  }

  if (!isAuthenticated || isError)
  {
    return <Navigate to={fallback} state={{ from: location }} replace />;
  }

  if (isFetching || !isSuccess)
  {
    return <SplashScreen />;
  }

  // Handle onboarding enforcement
  if (requireOnboarding && data?.onboardingStatus === 'NO_ORG')
  {
    return <Navigate to={MERCHANT_ROUTES.ONBOARDING_ORGANIZATION} replace />;
  }

  // If we are ON the onboarding page but onboarding is ALREADY DONE, push them to dashboard
  if (!requireOnboarding && data?.onboardingStatus === 'COMPLETED' && location.pathname === MERCHANT_ROUTES.ONBOARDING_ORGANIZATION)
  {
    return <Navigate to={MERCHANT_ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
}
