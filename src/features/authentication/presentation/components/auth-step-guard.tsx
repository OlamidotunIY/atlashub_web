import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface AuthStepGuardProps
{
  /** The condition that must be true for the user to be on this page */
  condition: boolean;
  /** Where to redirect if the condition is not met */
  redirectTo: string;
  children: ReactNode;
}

/**
 * Redirects the user if they land on a multi-step auth page out of order.
 * e.g. if the user navigates directly to /auth/2fa without a preAuthToken.
 */
export function AuthStepGuard({ condition, redirectTo, children }: AuthStepGuardProps)
{
  const navigate = useNavigate();

  useEffect(() =>
  {
    if (!condition)
    {
      navigate(redirectTo, { replace: true });
    }
  }, [condition, redirectTo, navigate]);

  if (!condition) return null;

  return <>{children}</>;
}

