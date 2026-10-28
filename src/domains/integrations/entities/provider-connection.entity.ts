export type ProviderType = 'STRIPE' | 'PAYSTACK' | 'ANCHOR';

export type ProviderCapability =
  | 'CARD_COLLECTION'
  | 'BANK_TRANSFER_COLLECTION'
  | 'USSD_COLLECTION'
  | 'MOBILE_MONEY_COLLECTION'
  | 'QR_COLLECTION'
  | 'VIRTUAL_ACCOUNT_COLLECTION'
  | 'DEPOSIT_ACCOUNT'
  | 'BANKING'
  | 'TRANSFER'
  | 'REFUND'
  | 'SPLIT';

export interface ProviderOffering {
  provider: ProviderType;
  merchantCountry: string;
  environment: 'TEST' | 'LIVE';
  currencies: string[];
  capabilities: ProviderCapability[];
  sourceUrl?: string;
}

export interface ProviderAuthorization {
  id: number;
  environment: string;
  externalMerchantId?: string;
  status: 'ACTIVE' | 'PENDING' | 'REVOKED' | 'FAILED';
  health: 'HEALTHY' | 'DEGRADED' | 'DISCONNECTED';
  capabilities: ProviderCapability[];
}

export interface ProviderConnection {
  id: number;
  provider: ProviderType;
  merchantCountry: string;
  status: 'ACTIVE' | 'PENDING' | 'DISCONNECTED';
  authorizations: ProviderAuthorization[];
}
