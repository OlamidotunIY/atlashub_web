export interface TokenPairProps {
  accessToken: string ;
  refreshToken: string;
  accessExpiresAt: string;
  refreshExpiresAt: string;
}

export class TokenPair {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly accessExpiresAt: string,
    public readonly refreshExpiresAt: string
  ) {}

  /**
   * Domain Behaviors / Methods
   */

  isAccessTokenExpired(): boolean {
    return new Date() >= new Date(this.accessExpiresAt);
  }

  isRefreshTokenExpired(): boolean {
    return new Date() >= new Date(this.refreshExpiresAt);
  }

  getMsUntilAccessExpiry(): number {
    return new Date(this.accessExpiresAt).getTime() - Date.now();
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
