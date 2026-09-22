import * as React from 'react';
import { Button, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../ui';
import { SealQuestionIcon } from '@phosphor-icons/react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement>
{
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
  ...props
}: EmptyStateProps)
{
  return (
    <Empty className={className} {...props}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {icon || <SealQuestionIcon className="size-6" />}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {actionLabel && onAction && (
        <EmptyContent>
          <Button onClick={onAction} className="mt-2">
            {actionLabel}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
