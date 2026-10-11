import * as React from 'react';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@/shared/ui/empty';
import { TrayIcon } from '@phosphor-icons/react';
import { cn } from '@/shared/lib';

export interface DataTableEmptyStateProps {
  icon?: React.ComponentType<{ className?: string; weight?: any }> | React.ReactNode;
  heading?: string;
  description?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function DataTableEmptyState({
  icon: Icon = TrayIcon,
  heading = 'No records found',
  description = 'There is no data available to display at this moment.',
  action,
  children,
  className,
}: DataTableEmptyStateProps) {
  const renderIcon = () => {
    if (!Icon) return null;
    if (React.isValidElement(Icon)) return Icon;
    const IconComponent = Icon as React.ComponentType<{ className?: string; weight?: any }>;
    return <IconComponent className="size-6 text-muted-foreground" weight="duotone" />;
  };

  return (
    <Empty
      className={cn(
        'w-full flex flex-col items-center justify-center p-6 border-0 shadow-none text-center select-none m-auto',
        className,
      )}
    >
      <EmptyHeader className="gap-2.5 items-center text-center">
        <EmptyMedia
          variant="icon"
          className="size-12 rounded-2xl bg-muted/60 text-muted-foreground mb-1 shadow-xs"
        >
          {renderIcon()}
        </EmptyMedia>
        {heading && (
          <EmptyTitle className="text-sm font-semibold text-foreground tracking-tight text-center">
            {heading}
          </EmptyTitle>
        )}
        {description && (
          <EmptyDescription className="text-xs text-muted-foreground max-w-sm leading-relaxed text-center">
            {description}
          </EmptyDescription>
        )}
      </EmptyHeader>

      {(action || children) && (
        <EmptyContent className="mt-2 items-center text-center">
          {action}
          {children}
        </EmptyContent>
      )}
    </Empty>
  );
}
