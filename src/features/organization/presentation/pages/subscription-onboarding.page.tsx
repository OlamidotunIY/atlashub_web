import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MERCHANT_ROUTES } from '@/constants';
import { organizationApi, type Plan } from '../../infrastructure/rest/organization.api';
import { Button } from '@/shared/ui';
import { toast } from '@/shared/hooks';
import { Check, Sparkle, ArrowRight } from '@phosphor-icons/react';

export function SubscriptionOnboardingPage() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('growth');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    organizationApi.getPlans().then((p) => {
      setPlans(p);
      setIsLoading(false);
    });
  }, []);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlanId(plan.id);
    toast.add({
      title: `${plan.name} plan chosen`,
      description: 'Subscription checkout will be configured in Settings. Proceeding to workspace...',
      type: 'success',
    });
    setTimeout(() => {
      navigate(MERCHANT_ROUTES.DASHBOARD);
    }, 600);
  };

  const handleSkip = () => {
    navigate(MERCHANT_ROUTES.DASHBOARD);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
          <Sparkle className="size-3.5" weight="fill" />
          Choose your plan
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
          Select an AtlasHub Plan
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Choose a tier that fits your business scale. You can also skip this step and start on the complimentary tier.
        </p>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-sm text-muted-foreground animate-pulse">
          Loading subscription tiers...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const isPopular = plan.isPopular;
            const isSelected = selectedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 bg-card border transition-all ${
                  isPopular
                    ? 'border-primary ring-2 ring-primary/20 shadow-lg'
                    : 'border-border/80 shadow-xs hover:border-border'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-wider shadow-xs">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground min-h-[36px]">{plan.tagline}</p>

                  <div className="mt-4 mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-foreground">
                      ${plan.priceMonthly}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1.5 font-medium">/ month</span>
                  </div>

                  <div className="border-t border-border/60 pt-5 flex flex-col gap-3">
                    <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Included features
                    </span>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                        <Check className="size-4 text-primary shrink-0 mt-0.5" weight="bold" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    variant={isPopular ? 'default' : 'outline'}
                    className="w-full h-11 text-sm font-semibold rounded-xl"
                  >
                    {isSelected ? 'Current Choice' : `Select ${plan.name}`}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Skip / Footer Action */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <Button
          variant="ghost"
          onClick={handleSkip}
          className="text-sm font-medium text-muted-foreground hover:text-foreground h-11 px-6 rounded-xl"
        >
          Skip for now
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
}
