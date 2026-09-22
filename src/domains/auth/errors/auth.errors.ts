import { ApiError } from "@/shared/api";


/**
 * Thrown when the provided credentials (email/password) are incorrect.
 * Backend errorCode: INVALID_CREDENTIALS
 */
export class InvalidCredentialsError extends ApiError {}

/**
 * Thrown when the account has been suspended by an administrator.
 * Backend errorCode: ACCOUNT_SUSPENDED
 */
export class AccountSuspendedError extends ApiError {}

/**
 * Thrown when the account exists but email has not been verified yet.
 * Backend errorCode: ACCOUNT_UNVERIFIED
 */
export class AccountUnverifiedError extends ApiError {}

/**
 * Thrown when the account has MFA enabled and a second factor is required.
 * Backend errorCode: TWO_FACTOR_REQUIRED
 */
export class TwoFactorRequiredError extends ApiError {}

/**
 * Thrown when the session has expired and cannot be refreshed.
 * Backend errorCode: SESSION_EXPIRED
 */
export class SessionExpiredError extends ApiError {}

/**
 * Thrown when an OTP code is invalid.
 * Backend errorCode: INVALID_OTP
 */
export class InvalidOtpError extends ApiError {}

/**
 * Thrown when an OTP code has expired.
 * Backend errorCode: OTP_EXPIRED
 */
export class OtpExpiredError extends ApiError {}

