import { ArrowSquareOut, Palette, Sparkle } from '@phosphor-icons/react';
import { Button } from '@/shared/ui';

interface TemplateItem {
  id: string;
  name: string;
  category: string;
  description: string;
  previewUrl: string;
  tag: string;
  author: string;
}

const FEATURED_TEMPLATES: TemplateItem[] = [
  {
    id: 'apex-modern',
    name: 'Apex Modernist',
    category: 'Minimalist & Lifestyle',
    description: 'High-converting layout with rapid checkout drawer and mobile-first product cards.',
    previewUrl: 'https://storefront.atlashub.name.ng/demo/apex',
    tag: 'Trending',
    author: 'Atlas Core',
  },
  {
    id: 'nova-boutique',
    name: 'Nova Boutique',
    category: 'Apparel & Luxury Fashion',
    description: 'Editorial imagery, collection carousels, and variant swatches crafted for apparel.',
    previewUrl: 'https://storefront.atlashub.name.ng/demo/nova',
    tag: 'Popular',
    author: 'Studio Atelier',
  },
  {
    id: 'volt-tech',
    name: 'Volt Hardware & Electronics',
    category: 'Consumer Electronics & Gadgets',
    description: 'Rich spec comparison grids, customer reviews breakdown, and bundle upsells.',
    previewUrl: 'https://storefront.atlashub.name.ng/demo/volt',
    tag: 'New',
    author: 'Volt Systems',
  },
];

export function SuggestedTemplatesWidget() {
  return (
    <div className="w-full rounded-2xl bg-card border border-border/80 shadow-sm p-6 sm:p-7 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Palette className="size-4" weight="bold" />
            Storefront Connect
          </div>
          <h2 className="text-lg font-bold tracking-tight text-foreground mt-0.5">
            Suggested Storefront Templates
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Launch or restyle your online store with theme templates built for conversion.
          </p>
        </div>

        <a
          href="https://storefront.atlashub.name.ng"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
        >
          Browse Marketplace
          <ArrowSquareOut className="size-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {FEATURED_TEMPLATES.map((tmpl) => (
          <div
            key={tmpl.id}
            className="group flex flex-col justify-between rounded-xl border border-border/70 hover:border-primary/40 bg-muted/20 hover:bg-muted/40 p-5 transition-all shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {tmpl.tag}
                </span>
                <span className="text-[11px] text-muted-foreground">{tmpl.author}</span>
              </div>

              <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                {tmpl.name}
              </h3>
              <p className="text-[11px] text-primary/80 font-medium mt-0.5">{tmpl.category}</p>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{tmpl.description}</p>
            </div>

            <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                <Sparkle className="size-3 text-primary" weight="fill" />
                Theme Ready
              </span>
              <a
                href={tmpl.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" variant="outline" className="h-8 text-xs font-medium rounded-lg">
                  Preview Demo
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
