import { useNavigate } from 'react-router-dom';
import { PackageOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import { MERCHANT_ROUTES } from '@/constants';
import { Button, Separator } from '@/shared/ui';

export function ProductsOnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className='max-w-2xl mx-auto w-full mt-8 rounded-3xl shadow-xl bg-card md:p-10 p-10 flex flex-col gap-8'>
      <div className='flex flex-col justify-center items-center w-full gap-2'>
        <div className='bg-primary/40 p-2 rounded-md'>
          <PackageOpen className='text-primary size-10' />
        </div>
        <h1 className='font-bold md:text-3xl text-xl'>Choose Products</h1>
        <p className='text-center text-muted-foreground font-medium text-sm md:text-base'>
          Select the products and services you need.
        </p>
      </div>
      <Separator />

      <div className="flex flex-col gap-4 text-center py-10">
        <p className="text-muted-foreground">Product selection coming soon...</p>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 h-12 text-base rounded-xl font-medium"
            onClick={() => navigate(MERCHANT_ROUTES.ONBOARDING_ORGANIZATION)}
          >
            <ArrowLeft className="mr-2 size-5" />
            Back
          </Button>

          <Button
            className="flex-1 h-12 text-base rounded-xl font-medium"
            onClick={() => navigate(MERCHANT_ROUTES.ONBOARDING_TEAM)}
          >
            Continue
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>

        <Button
          variant="ghost"
          className="w-full h-12 text-base rounded-xl font-medium text-muted-foreground hover:text-foreground"
          onClick={() => navigate(MERCHANT_ROUTES.ONBOARDING_TEAM)}
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
}
