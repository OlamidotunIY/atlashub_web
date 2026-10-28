import { useNavigate } from 'react-router-dom';
import { MERCHANT_ROUTES } from '@/constants';
import {
  Package,
  Storefront,
  Receipt,
  Archive,
  Truck,
  Plug,
  ArrowRight,
} from '@phosphor-icons/react';

interface ActionItem {
  title: string;
  description: string;
  route: string;
  icon: typeof Package;
  color: string;
}

const ACTION_CARDS: ActionItem[] = [
  {
    title: 'Products',
    description: 'Add new items, manage variants & pricing',
    route: MERCHANT_ROUTES.COMMERCE_PRODUCTS,
    icon: Package,
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
  {
    title: 'Point of Sale (POS)',
    description: 'Launch cash register, scanner & card terminal',
    route: MERCHANT_ROUTES.COMMERCE_POS,
    icon: Storefront,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'Orders',
    description: 'Review online orders, fulfillment & invoices',
    route: MERCHANT_ROUTES.COMMERCE_ORDERS,
    icon: Receipt,
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  },
  {
    title: 'Inventory',
    description: 'Track outlet stock levels & reorder alerts',
    route: MERCHANT_ROUTES.COMMERCE_INVENTORY,
    icon: Archive,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  {
    title: 'Logistics',
    description: 'Shipment booking, carriers & returns',
    route: MERCHANT_ROUTES.LOGISTICS_SHIPMENTS,
    icon: Truck,
    color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    title: 'Provider Integrations',
    description: 'Connect Stripe, Paystack & Anchor in Settings',
    route: MERCHANT_ROUTES.SETTINGS_INTEGRATIONS,
    icon: Plug,
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  },
];

export function QuickActionsWidget() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {ACTION_CARDS.map((card) => (
        <button
          key={card.title}
          type="button"
          onClick={() => navigate(card.route)}
          className="group flex flex-col justify-between p-4 rounded-xl bg-card border border-border/80 hover:border-primary/50 hover:shadow-xs transition-all text-left cursor-pointer"
        >
          <div className="flex items-center justify-between w-full mb-3">
            <div className={`size-9 rounded-lg flex items-center justify-center border ${card.color}`}>
              <card.icon className="size-4.5" weight="bold" />
            </div>
            <ArrowRight className="size-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
              {card.title}
            </h4>
            <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-tight">
              {card.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
