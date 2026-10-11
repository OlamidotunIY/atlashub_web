import React from 'react';
import { MERCHANT_ROUTES } from '@/constants';
import { useMe, useSwitchEnvironment } from '@/features/authentication';
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Separator,
  SidebarTrigger,
  Switch,
} from '@/shared/ui';
import { GearSixIcon } from '@phosphor-icons/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resolveBreadcrumbs, useBreadcrumbsStore } from './breadcrumbs.store';

export function MainHeader()
{
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: user } = useMe();
  const { mutate: switchEnvironment, isPending } = useSwitchEnvironment();

  const customBreadcrumbs = useBreadcrumbsStore((s) => s.customBreadcrumbs);
  const breadcrumbs = customBreadcrumbs ?? resolveBreadcrumbs(pathname);
  const isTestMode = user?.activeEnvironment !== 'LIVE';
  const canSwitchEnvironment = user?.complianceApproved === true;

  const toggleEnvironment = () =>
  {
    switchEnvironment({ environment: isTestMode ? 'LIVE' : 'TEST' });
  };

  return (
    <header className="relative flex h-16 shrink-0 items-center border-b px-4 md:px-6">
      <div className="z-10 flex min-w-0 items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-3 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={`${crumb.label}-${idx}`}>
                  <BreadcrumbItem>
                    {isLast || !crumb.href ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="absolute top-0 w-full left-0">
        {isTestMode && (
          <div className='flex flex-col align-center justify-center items-center'>
            <div className='h-2 w-full rounded-sm bg-[linear-gradient(90deg,transparent_0%,#ea580c_38%,#ea580c_62%,transparent_100%)]' />
            <Badge className="h-7 rounded-none rounded-b-md border-0 bg-[#ea580c] px-3 text-xs text-white">
              You&apos;re in test mode. No real transactions will be processed. <span className="underline">Learn more ↗</span>
            </Badge>
          </div>
        )}
      </div>

      <div className="z-10 ml-auto flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span>{isTestMode ? 'Test mode' : 'Live mode'}</span>
          <Switch
            checked={isTestMode}
            aria-label={isTestMode ? 'Switch to live mode' : 'Switch to test mode'}
            size="sm"
            disabled={!canSwitchEnvironment || isPending}
            onCheckedChange={toggleEnvironment}
          />
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Open settings"
          onClick={() => navigate(MERCHANT_ROUTES.SETTINGS)}
        >
          <GearSixIcon className="size-5" weight="bold" />
        </Button>
      </div>
    </header>
  );
}
