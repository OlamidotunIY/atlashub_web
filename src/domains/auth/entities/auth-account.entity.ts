import { AuthStatus } from '../value-objects/auth-status.enum.js';

export interface AuthAccountProps {
  userId?: number;
  email?: string;
  imageUrl?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  totpEnabled?: boolean;
  status?: string;
  scope?: string;
  onboardingStatus?: string;
  activeEnvironment?: 'TEST' | 'LIVE';
  complianceApproved?: boolean;
  activeOrganizationId?: number;
  organizations?: OrganizationSummaryProps[];
}

export interface OrganizationSummaryProps {
  id?: number;
  businessName?: string;
  country?: string;
  baseCurrency?: string;
  logoUrl?: string;
}

export interface OrganizationSummary {
  id: number;
  businessName: string;
  country?: string;
  baseCurrency?: string;
  logoUrl?: string;
}

export class AuthAccount {
  constructor(
    public readonly id: string, // string mapped from userId
    public readonly email: string,
    public readonly status: AuthStatus,
    public readonly scope: string,
    public readonly twoFactorEnabled: boolean,
    public readonly onboardingStatus: string,
    public readonly activeEnvironment: 'TEST' | 'LIVE' = 'TEST',
    public readonly complianceApproved: boolean = false,
    public readonly imageUrl?: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly phone?: string,
    public readonly country?: string,
    public readonly activeOrganizationId?: number,
    public readonly organizations: OrganizationSummary[] = [],
  ) {}

  /**
   * Domain Behaviors / Methods
   */

  isActive(): boolean {
    return this.status === AuthStatus.ACTIVE;
  }

  isUnverified(): boolean {
    return this.status === AuthStatus.UNVERIFIED;
  }

  hasRole(roleName: string): boolean {
    return this.scope.includes(roleName);
  }

  isMerchant(): boolean {
    return this.scope.includes('MERCHANT');
  }

  isAdmin(): boolean {
    return this.scope.includes('ADMIN');
  }

  /**
   * Factory method to hydrate raw API JSON into the rich domain class
   */
  static fromJson(data: AuthAccountProps): AuthAccount {
    return new AuthAccount(
      String(data.userId || ''),
      data.email || '',
      (data.status as AuthStatus) || AuthStatus.UNVERIFIED,
      data.scope || '',
      data.totpEnabled || false,
      data.onboardingStatus || 'NO_ORG',
      data.activeEnvironment ?? 'TEST',
      data.complianceApproved ?? false,
      data.imageUrl,
      data.firstName,
      data.lastName,
      data.phone,
      data.country,
      data.activeOrganizationId,
      (data.organizations ?? [])
        .filter((organization): organization is OrganizationSummaryProps & { id: number } => organization.id != null)
        .map((organization) => ({
          id: organization.id,
          businessName: organization.businessName ?? 'Unnamed organization',
          country: organization.country,
          baseCurrency: organization.baseCurrency,
          logoUrl: organization.logoUrl,
        })),
    );
  }
}
