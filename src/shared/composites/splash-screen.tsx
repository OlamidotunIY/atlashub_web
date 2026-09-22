import { cn } from 'cn';
import * as React from 'react';
import { Spinner } from '../ui';

export interface SplashScreenProps extends React.HTMLAttributes<HTMLDivElement>
{
  logoSlot?: React.ReactNode;
  message?: string;
}

export function SplashScreen({ logoSlot, message, className, ...props }: SplashScreenProps)
{
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background',
        className
      )}
      {...props}
    >
      {logoSlot && <div className="mb-8 animate-pulse">{logoSlot}</div>}
      <Spinner className="size-8 text-primary" />
      {message && (
        <p className="mt-4 text-sm font-medium text-muted-foreground">{message}</p>
      )}
    </div>
  );
}
