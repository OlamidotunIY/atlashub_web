import { authStore } from '@/features/authentication';
import { SplashScreen } from '@/shared/composites';
import { Navigate, useLocation } from 'react-router-dom';
import { resolvePostAuthRoute } from './post-auth-route';

export function GuestGuard({ children, fallback }: { children: React.ReactNode; fallback: string }) {
  const isHydrated = authStore((state) => state.isHydrated);
  const isAuthenticated = authStore((state) => state.isAuthenticated());
  const location = useLocation();

  if (!isHydrated) {
    return <SplashScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to={resolvePostAuthRoute(location.state, fallback)} replace />;
  }

  return <>{children}</>;
}
