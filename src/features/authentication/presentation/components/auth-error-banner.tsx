interface AuthErrorBannerProps
{
  error: Error | null;
  fallback?: string;
}

/**
 * Displays the backend error message directly.
 * The error message is already extracted and human-readable
 * by the time it reaches here (via the error interceptor).
 */
export function AuthErrorBanner({ error, fallback = 'Something went wrong. Please try again.' }: AuthErrorBannerProps)
{
  if (!error) return null;

  return (
    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md" role="alert">
      {error.message || fallback}
    </div>
  );
}

