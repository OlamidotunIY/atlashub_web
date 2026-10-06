import { MERCHANT_ROUTES } from '@/constants';

type ReturnLocation = { pathname?: unknown; search?: unknown; hash?: unknown };

/** Returns a safe in-app route captured by AuthGuard before login. */
export function resolvePostAuthRoute(state: unknown, fallback: string): string {
  if (!state || typeof state !== 'object' || !('from' in state)) return fallback;

  const from = (state as { from?: ReturnLocation }).from;
  if (!from || typeof from.pathname !== 'string') return fallback;

  const { pathname } = from;
  if (
    !pathname.startsWith('/') ||
    pathname.startsWith('//') ||
    pathname.startsWith('/auth/') ||
    pathname === MERCHANT_ROUTES.LOGIN ||
    pathname === MERCHANT_ROUTES.REGISTRATION
  ) return fallback;

  return `${pathname}${typeof from.search === 'string' ? from.search : ''}${typeof from.hash === 'string' ? from.hash : ''}`;
}
