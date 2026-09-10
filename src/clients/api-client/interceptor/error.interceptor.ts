import axios, { AxiosInstance } from 'axios';
import { ApiError } from '../errors/api-error.js';
import { ErrorCode } from '../errors/error-codes.js';
import { ApiError as BackendError } from '@org/shared';

export function applyErrorInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (axios.isAxiosError(error)) {
        const backendBody: BackendError = error.response?.data;
        
        let errorMessage = backendBody?.message || 'An unknown error occurred';
        
        // Extract specific error details if available
        if (backendBody?.details) {
          if (typeof (backendBody.details as any).error === 'string') {
            errorMessage = (backendBody.details as any).error;
          } else if (Object.keys(backendBody.details).length > 0) {
            errorMessage = Object.entries(backendBody.details)
              .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
              .join(' | ');
          }
        }

        throw new ApiError(
          errorMessage,
          error.response?.status || 500,
          backendBody?.errorCode && backendBody.errorCode in ErrorCode
            ? ErrorCode[backendBody.errorCode as keyof typeof ErrorCode]
            : ErrorCode.UNKNOWN,
          backendBody?.details,
        );
      }
      throw error;
    },
  );
}
