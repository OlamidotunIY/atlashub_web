import { GuestGuard } from '@/app/guard';
import { AuthLayout } from '@/app/shell';
import { MERCHANT_ROUTES } from '@/constants';
import { InvitePage, LoginPage, SignupPage, VerifyEmailPage } from '@/pages/auth';
import type { RouteObject } from 'react-router-dom';

export const authRoutes: RouteObject[] = [
  {
    element: (
      <GuestGuard fallback={MERCHANT_ROUTES.DASHBOARD}>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      { path: MERCHANT_ROUTES.LOGIN, element: <LoginPage /> },
      { path: MERCHANT_ROUTES.REGISTRATION, element: <SignupPage /> },
      { path: MERCHANT_ROUTES.VERIFY_EMAIL, element: <VerifyEmailPage /> },
      { path: '/invite/:token', element: <InvitePage /> },
    ],
  },
];
