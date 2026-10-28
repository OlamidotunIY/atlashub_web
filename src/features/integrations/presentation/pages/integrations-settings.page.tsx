import { useState } from 'react';
import { useMe } from '@/features/authentication';
import
  {
    // useAvailableProviders,
    useConnections,
    useConnectCredential,
    useDisconnectProvider,
    useVerifyAuthorization,
  } from '../../application/queries/use-integrations.query';
import { integrationsApi } from '../../infrastructure/rest/integrations.api';
import type { ProviderType } from '@/domains/integrations/entities/provider-connection.entity';
import { Button, Input, Label } from '@/shared/ui';
import { toast } from '@/shared/hooks';
import
  {
    Plug,
    CheckCircle,
    Trash,
    ArrowSquareOut,
    ArrowsClockwise,
    CreditCard,
    Bank,
    ShieldCheck,
  } from '@phosphor-icons/react';

export function IntegrationsSettingsPage()
{
  const { data: user } = useMe();
  const country = user?.activeOrganization?.country || user?.country || 'NG';

  const { data: connections = [], isLoading: isLoadingConnections } = useConnections();
  // const { data: offerings = [], isLoading: isLoadingOfferings } = useAvailableProviders(country);

  const { mutateAsync: connectCred, isPending: isConnecting } = useConnectCredential();
  const { mutateAsync: disconnect, isPending: isDisconnecting } = useDisconnectProvider();
  const { mutateAsync: verifyAuth, isPending: isVerifying } = useVerifyAuthorization();

  const [modalProvider, setModalProvider] = useState<ProviderType | null>(null);
  const [credentialValue, setCredentialValue] = useState('');
  const [isStartingStripe, setIsStartingStripe] = useState(false);

  const handleStartStripe = async () =>
  {
    setIsStartingStripe(true);
    try
    {
      const res = await integrationsApi.startStripeOAuth({ merchantCountry: country });
      if (res.authorizationUrl)
      {
        window.location.href = res.authorizationUrl;
      }
    } catch (err: any)
    {
      toast.add({
        title: 'Failed to start Stripe Connect',
        description: err?.message || 'Could not initiate Stripe authorization.',
        type: 'error',
      });
    } finally
    {
      setIsStartingStripe(false);
    }
  };

  const handleConnectCredential = async (e: React.FormEvent) =>
  {
    e.preventDefault();
    if (!modalProvider || !credentialValue.trim()) return;

    try
    {
      await connectCred({
        provider: modalProvider,
        merchantCountry: country,
        credential: credentialValue.trim(),
      });
      toast.add({
        title: `${modalProvider} Connected`,
        description: 'Provider connection established successfully.',
        type: 'success',
      });
      setModalProvider(null);
      setCredentialValue('');
    } catch (err: any)
    {
      toast.add({
        title: 'Connection Failed',
        description: err?.message || 'Invalid provider credentials.',
        type: 'error',
      });
    }
  };

  const handleDisconnect = async (connectionId: number, name: string) =>
  {
    if (!window.confirm(`Are you sure you want to disconnect ${name}? Active checkout methods using this provider will stop working.`)) return;
    try
    {
      await disconnect(connectionId);
      toast.add({
        title: `${name} disconnected`,
        description: 'The connection has been safely removed.',
        type: 'success',
      });
    } catch (err: any)
    {
      toast.add({
        title: 'Disconnect failed',
        description: err?.message || 'Could not disconnect provider.',
        type: 'error',
      });
    }
  };

  const handleVerify = async (authId: number) =>
  {
    try
    {
      await verifyAuth(authId);
      toast.add({
        title: 'Authorization Verified',
        description: 'Provider health and capabilities have been updated.',
        type: 'success',
      });
    } catch (err: any)
    {
      toast.add({
        title: 'Verification failed',
        description: err?.message || 'Could not verify provider authorization.',
        type: 'error',
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 flex flex-col gap-8">
      {/* Header */}
      <div className="border-b border-border/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Plug className="size-4" weight="bold" />
          Settings & Integrations
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
          Connected Payment & Banking Providers
        </h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-3xl leading-relaxed">
          AtlasHub operates with merchant-owned provider connections. Connect your Stripe, Paystack, or Anchor account to activate live checkout, bank deposits, and automated transfers.
        </p>
      </div>

      {/* Connected Providers List */}
      <div className="flex flex-col gap-4">
        <h2 className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
          <ShieldCheck className="size-4 text-primary" weight="bold" />
          Active Connections ({connections.length})
        </h2>

        {isLoadingConnections ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse border border-border/60 rounded-xl bg-card">
            Loading provider connections...
          </div>
        ) : connections.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-dashed border-border/80 bg-muted/20 flex flex-col items-center gap-3">
            <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Plug className="size-6" />
            </div>
            <div className="max-w-md">
              <h3 className="text-sm font-bold text-foreground">No providers connected yet</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Connect an eligible provider below to activate card checkout, accounts, and automated payouts for your business.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {connections.map((conn) =>
            {
              const activeAuth = conn.authorizations[0];
              const capabilities = activeAuth?.capabilities || [];

              return (
                <div
                  key={conn.id}
                  className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs flex flex-col gap-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        {conn.provider === 'STRIPE' ? (
                          <CreditCard className="size-5" />
                        ) : (
                          <Bank className="size-5" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-foreground">{conn.provider}</h3>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1">
                            <CheckCircle className="size-3" weight="fill" />
                            {conn.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Country: {conn.merchantCountry} • Health: {activeAuth?.health || 'HEALTHY'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {activeAuth && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={isVerifying}
                          onClick={() => handleVerify(activeAuth.id)}
                          className="h-8 text-xs font-medium rounded-lg"
                        >
                          <ArrowsClockwise className="mr-1 size-3.5" />
                          Verify
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={isDisconnecting}
                        onClick={() => handleDisconnect(conn.id, conn.provider)}
                        className="h-8 text-xs font-medium rounded-lg text-destructive hover:bg-destructive/10"
                      >
                        <Trash className="mr-1 size-3.5" />
                        Disconnect
                      </Button>
                    </div>
                  </div>

                  {/* Capabilities enabled by this provider */}
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                      Active Capabilities
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {capabilities.length > 0 ? (
                        capabilities.map((cap) => (
                          <span
                            key={cap}
                            className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border/80"
                          >
                            {cap.replace(/_/g, ' ')}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">Standard integration active</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Available Catalog Providers */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-base font-bold tracking-tight text-foreground">
            Available Providers for {country}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Select a supported provider to connect credentials or launch hosted onboarding.
          </p>
        </div>

        {isLoadingOfferings ? (
          <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
            Loading provider offerings...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Stripe Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="size-11 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold mb-4">
                  <CreditCard className="size-6" weight="bold" />
                </div>
                <h3 className="text-base font-bold text-foreground">Stripe Connect</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Global credit/debit card collection, Apple Pay, Google Pay, and direct bank payouts across 40+ countries.
                </p>
                <div className="mt-4 flex flex-wrap gap-1">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    Cards
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    Multi-Currency
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    Refunds
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60">
                <Button
                  onClick={handleStartStripe}
                  disabled={isStartingStripe}
                  className="w-full h-10 text-xs font-semibold rounded-lg"
                >
                  <ArrowSquareOut className="mr-1.5 size-4" />
                  {isStartingStripe ? 'Opening Stripe...' : 'Connect with Stripe'}
                </Button>
              </div>
            </div>

            {/* Paystack Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="size-11 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold mb-4">
                  <Bank className="size-6" weight="bold" />
                </div>
                <h3 className="text-base font-bold text-foreground">Paystack</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Leading payments gateway across Nigeria, Ghana, Kenya, and South Africa for cards, USSD, and bank transfers.
                </p>
                <div className="mt-4 flex flex-wrap gap-1">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    NGN / GHS / ZAR
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    Bank Transfers
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    USSD
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60">
                <Button
                  variant="outline"
                  onClick={() => setModalProvider('PAYSTACK')}
                  className="w-full h-10 text-xs font-semibold rounded-lg"
                >
                  Enter Paystack API Key
                </Button>
              </div>
            </div>

            {/* Anchor Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="size-11 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold mb-4">
                  <Bank className="size-6" weight="bold" />
                </div>
                <h3 className="text-base font-bold text-foreground">Anchor Banking</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Dedicated virtual deposit accounts, automated inward clearing, and corporate account settlement.
                </p>
                <div className="mt-4 flex flex-wrap gap-1">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    Deposit Accounts
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    Virtual NUBAN
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    Banking
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60">
                <Button
                  variant="outline"
                  onClick={() => setModalProvider('ANCHOR')}
                  className="w-full h-10 text-xs font-semibold rounded-lg"
                >
                  Enter Anchor Credentials
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Credential Connection Modal */}
      {modalProvider && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-6 flex flex-col gap-5 animate-in fade-in zoom-in-95">
            <div>
              <h3 className="text-lg font-bold text-foreground">Connect {modalProvider}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Enter your merchant secret or API credential to securely link {modalProvider}.
              </p>
            </div>

            <form onSubmit={handleConnectCredential} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="credInput" className="text-xs font-medium text-foreground">
                  Secret Key / API Credential
                </Label>
                <Input
                  id="credInput"
                  type="password"
                  placeholder="sk_live_... or token"
                  required
                  autoFocus
                  value={credentialValue}
                  onChange={(e) => setCredentialValue(e.target.value)}
                  disabled={isConnecting}
                  className="h-10 text-sm font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setModalProvider(null)}
                  disabled={isConnecting}
                  className="h-9 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!credentialValue.trim() || isConnecting}
                  className="h-9 text-xs font-semibold px-4"
                >
                  {isConnecting ? 'Verifying...' : 'Save & Link'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
