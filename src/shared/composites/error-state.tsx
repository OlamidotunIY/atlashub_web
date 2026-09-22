import * as React from 'react';
import { Button, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../ui';
import { WarningCircleIcon } from '@phosphor-icons/react';
import { cn } from 'cn';

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <Empty
      className={cn('border-destructive/20 bg-destructive/5 text-destructive', className)}
      {...props}
    >
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-destructive/10 text-destructive">
          <WarningCircleIcon className="size-6" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription className="text-destructive/80">{message}</EmptyDescription>
      </EmptyHeader>
      {onRetry && (
        <EmptyContent>
          <Button
            variant="outline"
            onClick={onRetry}
            className="mt-2 border-destructive/20 hover:bg-destructive/10"
          >
            Try again
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
