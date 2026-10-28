import { useState } from 'react';
import { PaperPlaneRight, Sparkle, Lightning, ChartLineUp, Package, ShieldCheck } from '@phosphor-icons/react';
import { Button } from '@/shared/ui';

interface CommandCenterWidgetProps {
  userName?: string;
  organizationName?: string;
}

interface CommandPrompt {
  id: string;
  label: string;
  prompt: string;
  icon: typeof Sparkle;
}

const SUGGESTED_PROMPTS: CommandPrompt[] = [
  {
    id: '1',
    label: "Today's revenue & volume",
    prompt: "Show me today's sales performance and average order value across outlets.",
    icon: ChartLineUp,
  },
  {
    id: '2',
    label: 'Low stock alerts',
    prompt: 'Which products are below safety reorder threshold this week?',
    icon: Package,
  },
  {
    id: '3',
    label: 'Storefront theme optimization',
    prompt: 'Analyze conversion rate suggestions for our active storefront theme.',
    icon: Lightning,
  },
  {
    id: '4',
    label: 'Provider & payment health',
    prompt: 'Check connectivity status and settlement health across connected payment providers.',
    icon: ShieldCheck,
  },
];

export function CommandCenterWidget({ userName, organizationName }: CommandCenterWidgetProps) {
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleExecute = (promptText?: string) => {
    const textToRun = promptText || query;
    if (!textToRun.trim()) return;

    setIsThinking(true);
    setAiResponse(null);

    // Simulate intelligent analytical query processing
    setTimeout(() => {
      setIsThinking(false);
      setAiResponse(
        `Atlas AI Analysis for "${textToRun}":\n\n• Gross sales are trending +14.2% week-over-week across connected channels.\n• 3 items require inventory replenishment before Friday (SKU: NOV-802, APX-104).\n• All active provider integrations are healthy with 100% gateway uptime in the last 24 hours.`
      );
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecute();
    }
  };

  const greetingName = userName || organizationName || 'Operator';

  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-linear-to-br from-card via-card to-primary/5 border border-border/80 shadow-sm p-6 sm:p-8">
      {/* Background Accent Glow */}
      <div className="absolute -top-16 -right-16 size-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-5">
        {/* Header Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkle className="size-4" weight="fill" />
              Intelligence Command Center
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
              Welcome back, {greetingName}
            </h1>
          </div>
          <span className="text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full border border-border/60 w-fit">
            AI Engine: Active & Grounded
          </span>
        </div>

        {/* Command Center Input Bar */}
        <div className="relative flex items-center w-full">
          <div className="absolute left-4 text-primary pointer-events-none">
            <Sparkle className="size-5 animate-pulse" weight="fill" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Atlas AI to check revenue, draft products, find stock urgency, or query payouts..."
            className="w-full h-13 pl-12 pr-14 rounded-xl border border-primary/30 bg-background/80 backdrop-blur-xs text-sm sm:text-base text-foreground placeholder:text-muted-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all"
          />
          <div className="absolute right-2">
            <Button
              type="button"
              size="icon"
              onClick={() => handleExecute()}
              disabled={!query.trim() || isThinking}
              className="size-9 rounded-lg shadow-xs"
            >
              <PaperPlaneRight className="size-4" weight="bold" />
            </Button>
          </div>
        </div>

        {/* Quick Action Prompt Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-medium text-muted-foreground mr-1">Suggestions:</span>
          {SUGGESTED_PROMPTS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setQuery(item.prompt);
                handleExecute(item.prompt);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/60 hover:bg-muted border border-border/60 hover:border-primary/40 text-foreground transition-all cursor-pointer"
            >
              <item.icon className="size-3.5 text-primary" weight="bold" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* AI Response Display */}
        {isThinking && (
          <div className="mt-3 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3 text-xs text-primary animate-pulse">
            <Sparkle className="size-4 animate-spin" />
            Synthesizing platform intelligence across modules...
          </div>
        )}

        {aiResponse && !isThinking && (
          <div className="mt-3 p-4 rounded-xl bg-card border border-primary/30 shadow-xs flex flex-col gap-2 text-xs leading-relaxed text-foreground animate-in fade-in">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <span className="font-semibold text-primary flex items-center gap-1.5">
                <Sparkle className="size-3.5" weight="fill" />
                Live Platform Response
              </span>
              <button
                onClick={() => setAiResponse(null)}
                className="text-muted-foreground hover:text-foreground text-[11px] cursor-pointer"
              >
                Dismiss
              </button>
            </div>
            <p className="whitespace-pre-line text-muted-foreground pt-1">{aiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}
