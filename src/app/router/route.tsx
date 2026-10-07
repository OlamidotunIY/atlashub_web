import { MERCHANT_ROUTES } from '@/constants';
import { createHashRouter, Navigate } from 'react-router-dom';
import { authRoutes } from './routes/auth.routes';
import { merchantRoutes } from './routes/merchant.routes';
import { onboardingRoutes } from './routes/onboarding.routes';

export const router = createHashRouter([
  { path: '/', element: <Navigate to={MERCHANT_ROUTES.LOGIN} replace /> },
  ...authRoutes,
  ...onboardingRoutes,
  ...merchantRoutes,
  { path: '*', element: <div className="p-8">404 Not Found</div> },
]);
