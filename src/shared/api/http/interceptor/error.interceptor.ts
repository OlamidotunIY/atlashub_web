import axios, { type AxiosInstance } from 'axios';
import { ApiError } from '../errors/api-error.js';
import { ErrorCode } from '../errors/error-codes.js';
import { type ApiError as BackendError } from '@/shared';
import {
  InvalidCredentialsError,
  AccountSuspendedError,
  AccountUnverifiedError,
  TwoFactorRequiredError,
  SessionExpiredError,
  InvalidOtpError,
  OtpExpiredError,
} from '@/domains/auth/errors/auth.errors.js';

/**
 * Maps backend errorCode values to domain-specific error subclasses.
 * The interceptor uses this as the source of truth — adding a new backend
 * error only requires a new entry here and a new class in domains/auth/errors/.
 */
const ERROR_CODE_MAP: Partial<Record<ErrorCode, typeof ApiError>> = {
  [ErrorCode.INVALID_CREDENTIALS]:  InvalidCredentialsError,
  [ErrorCode.ACCOUNT_SUSPENDED]:    AccountSuspendedError,
  [ErrorCode.ACCOUNT_UNVERIFIED]:   AccountUnverifiedError,
  [ErrorCode.TWO_FACTOR_REQUIRED]:  TwoFactorRequiredError,
  [ErrorCode.SESSION_EXPIRED]:      SessionExpiredError,
  [ErrorCode.INVALID_OTP]:          InvalidOtpError,
  [ErrorCode.OTP_EXPIRED]:          OtpExpiredError,
};

export function applyErrorInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (axios.isAxiosError(error)) {
        const backendBody: BackendError = error.response?.data;

        let errorMessage = backendBody?.message || 'An unknown error occurred';

        if (backendBody?.details) {
          if (typeof (backendBody.details).error === 'string') {
            errorMessage = (backendBody.details).error;
          } else if (Object.keys(backendBody.details).length > 0) {
            errorMessage = Object.entries(backendBody.details)
              .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
              .join(' | ');
          }
        }

        const errorCode = backendBody?.errorCode && backendBody.errorCode in ErrorCode
          ? ErrorCode[backendBody.errorCode as keyof typeof ErrorCode]
          : ErrorCode.UNKNOWN;

        const ErrorClass = ERROR_CODE_MAP[errorCode] ?? ApiError;

        throw new ErrorClass(
          errorMessage,
          error.response?.status || 500,
          errorCode,
          backendBody?.details,
        );
      }
      throw error;
    },
  );
}
