import { createHashRouter, Navigate } from 'react-router-dom';
import { AuthGuard, GuestGuard } from '../guard';
import { MERCHANT_ROUTES } from '@/constants';
import { InvitePage, LoginPage, SignupPage, VerifyEmailPage } from '@/pages/auth';
import { CompleteOnboardingPage, ProductsOnboardingPage, TeamOnboardingPage } from '@/pages/onboarding';
import { AuthLayout, OnboardingLayout } from '../shell';
import { PlaceholderPage } from '@/pages/placeholder';
import { OverviewPage } from '@/pages/main';

export const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to={MERCHANT_ROUTES.LOGIN} replace />
  },
  {
    element: (
      <GuestGuard fallback={MERCHANT_ROUTES.DASHBOARD}>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: MERCHANT_ROUTES.LOGIN,
        element: <LoginPage />
      },
      {
        path: MERCHANT_ROUTES.REGISTRATION,
        element: <SignupPage />
      },
      {
        path: MERCHANT_ROUTES.VERIFY_EMAIL,
        element: <VerifyEmailPage />
      },
      {
        path: '/invite/:token',
        element: <InvitePage />
      }
    ]
  },
  {
    element: (
      <AuthGuard fallback={MERCHANT_ROUTES.LOGIN} requireOnboarding={false}>
        <OnboardingLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: MERCHANT_ROUTES.ONBOARDING_PRODUCTS,
        element: <ProductsOnboardingPage />
      },
      {
        path: MERCHANT_ROUTES.ONBOARDING_TEAM,
        element: <TeamOnboardingPage />
      },
      {
        path: MERCHANT_ROUTES.ONBOARDING_COMPLETE,
        element: <CompleteOnboardingPage />
      }
    ]
  },
  {
    element: (
      <AuthGuard fallback={MERCHANT_ROUTES.LOGIN}>
        <div />
      </AuthGuard>
    ),
    children: [
      {
        path: MERCHANT_ROUTES.DASHBOARD,
        element: <OverviewPage />
      },
      {
        path: MERCHANT_ROUTES.ATLAS_PAY,
        element: <PlaceholderPage title="AtlasPay Overview" />
      },
      {
        path: MERCHANT_ROUTES.ATLAS_PAY_TRANSACTIONS,
        element: <PlaceholderPage title="AtlasPay Transactions" />
      },
      {
        path: MERCHANT_ROUTES.ATLAS_PAY_ACCOUNTS,
        element: <PlaceholderPage title="AtlasPay Accounts" />
      },
      {
        path: MERCHANT_ROUTES.TEAM,
        element: <PlaceholderPage title="Team" />
      },
      {
        path: MERCHANT_ROUTES.SETTINGS,
        element: <PlaceholderPage title="Settings" />
      },
      {
        path: MERCHANT_ROUTES.COMMERCE,
        element: <PlaceholderPage title="Commerce" />
      },
      {
        path: MERCHANT_ROUTES.LOGISTICS,
        element: <PlaceholderPage title="Logistics" />
      }
    ]
  },
  {
    path: MERCHANT_ROUTES.MARKETPLACE,
    element: (
      <AuthGuard fallback={MERCHANT_ROUTES.LOGIN}>
        <PlaceholderPage title="Marketplace" />
      </AuthGuard>
    )
  },
  {
    path: '*',
    element: <div className="p-8">404 Not Found</div>
  }
]);

