import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import { ThemeProvider } from '@/app/providers/theme-provider.js';
import { router } from '@/app/router/route.js';
import { bootstrap } from '@/app/bootstrap.js';
import { queryClient } from '@/shared/api/query/query-client.js';
import { Toaster } from './shared/ui';

// Run bootstrap synchronously (API client setup) then render.
// hydrate() is async but we don't need to block rendering for it —
// the router's AuthGuard reads from the store after hydration.
bootstrap().then(() =>
{
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
});
