import { Package, Plus, ArrowRight } from '@phosphor-icons/react';
import { Button } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';
import { MERCHANT_ROUTES } from '@/constants';

interface ProductItem {
  id: string;
  name: string;
  sku: string;
  price: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const SAMPLE_PRODUCTS: ProductItem[] = [
  { id: '1', name: 'Atlas Mechanical POS Terminal v2', sku: 'POS-V2-01', price: '₦145,000', stock: 24, status: 'In Stock' },
  { id: '2', name: 'Thermal Receipt Rolls (Box of 50)', sku: 'TRM-50-BX', price: '₦18,500', stock: 6, status: 'Low Stock' },
  { id: '3', name: 'Wireless Barcode Scanner HD', sku: 'SCN-WL-08', price: '₦32,000', stock: 42, status: 'In Stock' },
  { id: '4', name: 'Smart Card NFC Reader Module', sku: 'NFC-MOD-99', price: '₦28,000', stock: 0, status: 'Out of Stock' },
];

export function ProductsSpotlightWidget() {
  const navigate = useNavigate();

  return (
    <div className="w-full rounded-2xl bg-card border border-border/80 shadow-sm p-6 sm:p-7 flex flex-col gap-5">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Package className="size-4" weight="bold" />
            Catalog Overview
          </div>
          <h2 className="text-lg font-bold tracking-tight text-foreground mt-0.5">
            Active Products
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => navigate(MERCHANT_ROUTES.COMMERCE_PRODUCTS)}
            className="h-8 text-xs font-medium rounded-lg"
          >
            <Plus className="mr-1 size-3.5" weight="bold" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border/60">
        {SAMPLE_PRODUCTS.map((prod) => (
          <div key={prod.id} className="py-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Package className="size-4" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">{prod.name}</div>
                <div className="text-muted-foreground text-[11px] mt-0.5">SKU: {prod.sku}</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-right">
              <div>
                <div className="font-bold text-foreground text-sm">{prod.price}</div>
                <div className="text-muted-foreground text-[11px]">{prod.stock} units available</div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                  prod.status === 'In Stock'
                    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                    : prod.status === 'Low Stock'
                    ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                    : 'bg-destructive/10 text-destructive border-destructive/20'
                }`}
              >
                {prod.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-border/40 text-right">
        <button
          onClick={() => navigate(MERCHANT_ROUTES.COMMERCE_PRODUCTS)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
        >
          View all catalog items
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
