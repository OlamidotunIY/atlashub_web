import { useEffect } from 'react';
import { createHashRouter, Navigate, Outlet, useLocation } from 'react-router-dom';
import { MERCHANT_ROUTES } from '@/constants';
import { authRoutes } from './routes/auth.routes';
import { merchantRoutes } from './routes/merchant.routes';
import { onboardingRoutes } from './routes/onboarding.routes';
import { formatDocumentTitle, resolvePageTitle } from '@/shared/hooks';
import { useBreadcrumbsStore } from '@/app/shell';

function RootRouteListener() {
  const { pathname } = useLocation();
  const customBreadcrumbs = useBreadcrumbsStore((s) => s.customBreadcrumbs);

  useEffect(() => {
    if (customBreadcrumbs && customBreadcrumbs.length > 0) {
      const activeCrumb = customBreadcrumbs[customBreadcrumbs.length - 1];
      if (activeCrumb?.label) {
        document.title = formatDocumentTitle(activeCrumb.label);
        return;
      }
    }

    const title = resolvePageTitle(pathname);
    document.title = formatDocumentTitle(title);
  }, [pathname, customBreadcrumbs]);

  return <Outlet />;
}

export const router = createHashRouter([
  {
    element: <RootRouteListener />,
    children: [
      { path: '/', element: <Navigate to={MERCHANT_ROUTES.LOGIN} replace /> },
      ...authRoutes,
      ...onboardingRoutes,
      ...merchantRoutes,
      { path: '*', element: <div className="p-8">404 Not Found</div> },
    ],
  },
]);
