import { MERCHANT_ROUTES } from '@/constants';
import { useAuthAccount, useAuthStore, useLogout } from '@/features/authentication';
import { Avatar, AvatarFallback, AvatarImage, Button, Logo } from '@/shared/ui';
import { SignOutIcon } from '@phosphor-icons/react';
import { Outlet, useLocation } from 'react-router-dom';

const ONBOARDING_STEPS = [
  {
    id: 1,
    title: 'Create Organization',
    description: 'Set up your organization to get started',
    route: MERCHANT_ROUTES.ONBOARDING_ORGANIZATION,
  },
  {
    id: 2,
    title: 'Choose Products',
    description: 'Select the products and services you need',
    route: MERCHANT_ROUTES.ONBOARDING_PRODUCTS,
  },
  {
    id: 3,
    title: 'Invite Team',
    description: 'Add your team members and set permissions',
    route: MERCHANT_ROUTES.ONBOARDING_TEAM,
  },
  {
    id: 4,
    title: 'Get Started',
    description: "You're all set! Let's build something amazing",
    route: MERCHANT_ROUTES.ONBOARDING_COMPLETE,
  },
];

export function OnboardingLayout() {
  const { data: user } = useAuthAccount();
  const jti = useAuthStore(state => state.jti);
  const clear = useAuthStore(state => state.clear);
  const { mutateAsync: logout } = useLogout();
  const location = useLocation();

  const handleLogout = async () => {
    if (jti) {
      await logout(jti).catch(() => {});
    }
    clear();
  };

  const currentStepIndex = ONBOARDING_STEPS.findIndex(step => step.route === location.pathname) >= 0
    ? ONBOARDING_STEPS.findIndex(step => step.route === location.pathname)
    : 0;

  return (
    <div className="min-h-screen flex">
      <div className='md:w-80 lg:w-96 hidden md:flex flex-col bg-primary bg-linear-to-b from-black/80 to-black/70 p-10 shrink-0'>
        <div className='w-full flex shrink-0'>
          <Logo size='xl' textColor='text-white' />
        </div>

        {/* Progress Stepper */}
        <div className="mt-16 flex flex-col relative shrink-0">
          {ONBOARDING_STEPS.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;
            const isLast = index === ONBOARDING_STEPS.length - 1;

            return (
              <div key={step.id} className={`flex gap-4 relative z-10 ${!isLast ? 'mb-8' : ''}`}>
                {!isLast && (
                  <div className="absolute left-3.75 top-8 -bottom-8 w-px border-l border-dashed border-white/20"></div>
                )}
                <div
                  className={`size-8 rounded-full flex items-center justify-center font-semibold text-white shrink-0 text-sm ${isActive || isCompleted ? 'bg-primary' : 'bg-white/10'}`}
                >
                  {step.id}
                </div>
                <div className="flex flex-col pt-1">
                  <h3 className="text-white font-semibold text-sm">{step.title}</h3>
                  <p className="text-white/60 text-xs mt-1 leading-snug">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 pt-8 shrink-0 flex flex-col">
          <img src="/onboarding-side-image.png" alt="Onboarding illustration" className="w-full object-contain mb-6 drop-shadow-xl" />
          <div className="flex flex-col">
            <span className="text-primary text-6xl leading-none font-serif font-black mb-1">“</span>
            <p className="text-white text-md font-medium leading-relaxed">
              One business. One account.<br/>
              One dashboard. One connected<br/>
              ecosystem.
            </p>
            <p className="text-white/60 text-xl mt-4">
              Welcome to <span className="text-primary font-semibold">AtlasHub.</span>
            </p>
          </div>
        </div>
      </div>
      <div className='flex-1 p-5 flex flex-col'>
        <div className='w-full flex justify-end shrink-0'>
          <div className='flex items-center gap-5'>
            <div className='flex items-center gap-3'>
              <Avatar className="size-12">
                <AvatarImage src={user?.imageUrl || undefined} />
                <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                  {user?.firstName?.charAt(0)?.toUpperCase()}
                  {user?.lastName?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <p className='text-sm font-semibold'>
                  {user?.firstName} {user?.lastName}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {user?.email}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="bg-transparent rounded-md h-full border text-destructive px-4">
              <SignOutIcon />
              Logout
            </Button>
          </div>
        </div>
        <div className='flex-1 flex flex-col'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
