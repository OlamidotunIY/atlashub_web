export interface ApiResponse<T> {
 status: string,
 data: T,
 message?: string
}

export interface PaginatedResponse<T> {
     status: string,
     data: T,
     meta: {
        page: number,
        pageSize: number,
        total: number,
        totalPages: number
     }
}

export interface ApiError {
    status: string,
    errorCode: string,
    message: string,
    details?: Record<string, string[]>
}