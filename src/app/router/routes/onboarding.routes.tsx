import { AuthGuard } from '@/app/guard';
import { OnboardingLayout } from '@/app/shell';
import { MERCHANT_ROUTES } from '@/constants';
import { CompleteOnboardingPage, ProductsOnboardingPage, TeamOnboardingPage } from '@/pages/onboarding';
import type { RouteObject } from 'react-router-dom';

export const onboardingRoutes: RouteObject[] = [
  {
    element: (
      <AuthGuard fallback={MERCHANT_ROUTES.LOGIN}>
        <OnboardingLayout />
      </AuthGuard>
    ),
    children: [
      { path: MERCHANT_ROUTES.ONBOARDING_PRODUCTS, element: <ProductsOnboardingPage /> },
      { path: MERCHANT_ROUTES.ONBOARDING_TEAM, element: <TeamOnboardingPage /> },
      { path: MERCHANT_ROUTES.ONBOARDING_COMPLETE, element: <CompleteOnboardingPage /> },
    ],
  },
];
