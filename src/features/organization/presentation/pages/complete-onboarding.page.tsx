import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, CheckCircleIcon } from '@phosphor-icons/react';
import { MERCHANT_ROUTES } from '@/constants';
import { Button, Separator } from '@/shared/ui';

export function CompleteOnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className='max-w-2xl mx-auto w-full mt-8 rounded-3xl shadow-xl bg-card md:p-10 p-10 flex flex-col gap-8'>
      <div className='flex flex-col justify-center items-center w-full gap-2'>
        <div className='bg-primary/40 p-2 rounded-md'>
          <CheckCircleIcon className='text-primary size-10' />
        </div>
        <h1 className='font-bold md:text-3xl text-xl'>Get Started</h1>
        <p className='text-center text-muted-foreground font-medium text-sm md:text-base'>
          You're all set! Let's build something amazing.
        </p>
      </div>
      <Separator />

      <div className="flex flex-col gap-4 text-center py-10">
        <p className="text-muted-foreground">Setup complete!</p>
      </div>

      <div className="flex gap-4 mt-6">
        <Button
          className="w-full h-12 text-base rounded-xl font-medium"
          onClick={() => navigate(MERCHANT_ROUTES.DASHBOARD)}
        >
          Go to Dashboard
          <ArrowRightIcon className="ml-2 size-5" />
        </Button>
      </div>
    </div>
  );
}
