export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export enum PrincipalType {
    MERCHANT = 'MERCHANT',
    ADMIN = 'ADMIN',
}

export enum AuthStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
    UNVERIFIED = 'UNVERIFIED',
    PENDING_2FA = 'PENDING_2FA',
}

export interface MerchantPrincipal {
    id: string;
    email: string;
    principalType: PrincipalType.MERCHANT;
    status: AuthStatus;
    roles: string[];
}

export interface AdminPrincipal {
    id: string;
    email: string;
    employeeCode: string;
    principalType: PrincipalType.ADMIN;
    status: AuthStatus;
    roles: string[];
}

export type AuthPrincipal = MerchantPrincipal | AdminPrincipal;