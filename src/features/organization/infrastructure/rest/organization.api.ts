import { getGlobalApiClient } from '@/shared/api';
import type { ApiResponse } from '@/shared';
import type { CreateOrganizationFormValues } from '../../domain/schemas/create-organization.schema';

const getApi = () => getGlobalApiClient();

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  currency: string;
  isPopular?: boolean;
  features: string[];
}

export const organizationApi = {
  createOrganization: async (payload: CreateOrganizationFormValues): Promise<number> => {
    const res = await getApi().post<ApiResponse<number>>('/api/v1/organizations', {
      businessName: payload.businessName.trim(),
      registrationType: payload.registrationType,
      industry: payload.industry,
      country: payload.country.trim().toUpperCase(),
      baseCurrency: payload.baseCurrency.trim().toUpperCase(),
      description: payload.description?.trim() || null,
      websiteUrl: payload.websiteUrl?.trim() || null,
      logoUrl: payload.logoUrl?.trim() || null,
    });
    return res.data.data;
  },

  getPlans: async (): Promise<Plan[]> => {
    return [
      {
        id: 'starter',
        name: 'Starter',
        tagline: 'Ideal for early-stage shops and solo founders.',
        priceMonthly: 0,
        currency: 'USD',
        features: [
          'Storefront Connect integration',
          'Up to 100 products',
          'Standard POS checkout',
          '1 warehouse & location',
          'Community support',
        ],
      },
      {
        id: 'growth',
        name: 'Growth',
        tagline: 'Built for scaling retail, commerce & multiple staff.',
        priceMonthly: 29,
        currency: 'USD',
        isPopular: true,
        features: [
          'Unlimited products & variants',
          'Advanced AI Command Center insights',
          'Multi-location inventory & stock transfers',
          'Team roles & staff attendance',
          'Integrated accounting & general ledger',
          'Priority email & chat support',
        ],
      },
      {
        id: 'scale',
        name: 'Enterprise / Scale',
        tagline: 'High-volume businesses needing custom providers and SLA.',
        priceMonthly: 99,
        currency: 'USD',
        features: [
          'Everything in Growth',
          'Dedicated account manager',
          'Custom logistics & payment routing',
          'Advanced multi-currency settlement',
          'Audit logs & developer webhooks',
          '99.9% uptime SLA',
        ],
      },
    ];
  },
};
