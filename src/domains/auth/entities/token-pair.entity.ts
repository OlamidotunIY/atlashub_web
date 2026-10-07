export interface TokenPairProps {
  accessToken: string ;
  refreshToken: string;
  accessExpiresAt: number;
  refreshExpiresAt: number;
}

export class TokenPair {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly accessExpiresAt: number,
    public readonly refreshExpiresAt: number
  ) {}

  /**
   * Domain Behaviors / Methods
   */

  isAccessTokenExpired(): boolean {
    return new Date() >= new Date(this.accessExpiresAt * 1000);
  }

  isRefreshTokenExpired(): boolean {
    return new Date() >= new Date(this.refreshExpiresAt * 1000);
  }

  getMsUntilAccessExpiry(): number {
    return this.accessExpiresAt * 1000 - Date.now();
  }

  /**
   * Factory method to hydrate raw API JSON into the rich domain class
   */
  static fromJson(data: TokenPairProps): TokenPair {
    return new TokenPair(
      data.accessToken,
      data.refreshToken,
      data.accessExpiresAt,
      data.refreshExpiresAt
    );
  }
}
