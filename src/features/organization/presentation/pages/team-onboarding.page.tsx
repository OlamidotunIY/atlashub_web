import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MERCHANT_ROUTES } from '@/constants';
import { Button, Input, Label } from '@/shared/ui';
import { toast } from '@/shared/hooks';
import { UserPlus, ArrowRight, ArrowLeft, Trash, UsersThree } from '@phosphor-icons/react';

interface InviteItem {
  id: string;
  email: string;
  role: string;
}

export function TeamOnboardingPage() {
  const navigate = useNavigate();
  const [invites, setInvites] = useState<InviteItem[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentRole, setCurrentRole] = useState('MEMBER');

  const handleAddInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEmail.trim()) return;

    setInvites((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        email: currentEmail.trim(),
        role: currentRole,
      },
    ]);
    setCurrentEmail('');
  };

  const handleRemove = (id: string) => {
    setInvites((prev) => prev.filter((item) => item.id !== id));
  };

  const handleContinue = () => {
    if (invites.length > 0) {
      toast.add({
        title: 'Invitations queued',
        description: `${invites.length} invitation(s) will be dispatched.`,
        type: 'success',
      });
    }
    navigate(MERCHANT_ROUTES.ONBOARDING_SUBSCRIPTION);
  };

  const handleSkip = () => {
    navigate(MERCHANT_ROUTES.ONBOARDING_SUBSCRIPTION);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
          <UsersThree className="size-3.5" weight="bold" />
          Optional Step
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Invite Your Team Members
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Add colleagues to help manage your store, inventory, or orders. You can also skip this and invite them later in Settings.
        </p>
      </div>

      <div className="bg-card border border-border/80 rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col gap-6">
        {/* Invite Form */}
        <form onSubmit={handleAddInvite} className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 flex flex-col gap-1.5 w-full">
            <Label htmlFor="memberEmail" className="text-xs font-medium text-foreground">
              Colleague's Email
            </Label>
            <Input
              id="memberEmail"
              type="email"
              placeholder="colleague@example.com"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              className="h-10 text-sm"
            />
          </div>

          <div className="w-full sm:w-44 flex flex-col gap-1.5">
            <Label htmlFor="memberRole" className="text-xs font-medium text-foreground">
              Role
            </Label>
            <select
              id="memberRole"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <option value="MEMBER">Member</option>
              <option value="ADMINISTRATOR">Administrator</option>
              <option value="ACCOUNTANT">Accountant</option>
              <option value="CASHIER">Cashier / POS</option>
            </select>
          </div>

          <Button
            type="submit"
            variant="secondary"
            disabled={!currentEmail.trim()}
            className="h-10 px-4 text-xs font-semibold shrink-0 w-full sm:w-auto"
          >
            <UserPlus className="mr-1.5 size-4" />
            Add to List
          </Button>
        </form>

        {/* Invited List */}
        {invites.length > 0 && (
          <div className="border border-border/60 rounded-xl overflow-hidden divide-y divide-border/60">
            {invites.map((inv) => (
              <div key={inv.id} className="p-3.5 flex items-center justify-between text-xs bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                    {inv.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">{inv.email}</span>
                    <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground border border-border">
                      {inv.role}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(inv.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(MERCHANT_ROUTES.ONBOARDING_ORGANIZATION)}
            className="w-full sm:w-auto h-11 text-xs font-semibold px-5 rounded-lg"
          >
            <ArrowLeft className="mr-1.5 size-4" />
            Back
          </Button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="flex-1 sm:flex-none h-11 text-xs font-semibold px-5 rounded-lg text-muted-foreground hover:text-foreground"
            >
              Skip for now
            </Button>
            <Button
              onClick={handleContinue}
              className="flex-1 sm:flex-none h-11 text-xs font-semibold px-6 rounded-lg shadow-sm"
            >
              Continue
              <ArrowRight className="ml-1.5 size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
