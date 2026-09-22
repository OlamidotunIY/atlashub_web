import { ErrorCode } from "./error-codes";

export class ApiError extends Error {
    public readonly status: number;
    public readonly errorCode: ErrorCode;
    public readonly details?: Record<string, string[]>;

    constructor(
        message: string = 'An unknown API error occurred',
        status: number,
        errorCode: ErrorCode,
        details?: Record<string, string[]>
    ) {
        super(message);

        // Ensure the error name is set to the class name
        this.name = 'ApiError';

        this.status = status;
        this.errorCode = errorCode;
        this.details = details;

        // Required to make `instanceof ApiError` work properly when extending Error
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    get isUnauthorized(): boolean {
        return this.status === 401;
    }

    get isForbidden(): boolean {
        return this.status === 403;
    }

    get isNotFound(): boolean {
        return this.status === 404;
    }

    get isValidationError(): boolean {
        return this.status === 422;
    }
}