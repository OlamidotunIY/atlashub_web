import { authStore } from '@/features/authentication';
import { SplashScreen } from '@/shared/composites';
import { Navigate } from 'react-router-dom';

export function GuestGuard({ children, fallback }: { children: React.ReactNode; fallback: string })
{
  const isHydrated = authStore(state => state.isHydrated);
  const isAuthenticated = authStore(state => state.isAuthenticated());

  if (!isHydrated)
  {
    return <SplashScreen />;
  }

  if (isAuthenticated)
  {
    return <Navigate to={fallback} replace />;
  }
  return <>{children}</>;
}
