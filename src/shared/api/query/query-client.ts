import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '../http';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
             staleTime: 1000 * 60 * 5,
             gcTime: 1000 * 60 * 10,
             retry(failureCount, error : Error)
             {
                 // If the error was intercepted and mapped to our custom ApiError class
                 if (error instanceof ApiError && [401, 403].includes(Number(error.status))) return false;

                 return failureCount < 2
             },
             refetchOnWindowFocus: false,
             refetchOnReconnect: true,
        },
        mutations: {
            retry: false,
        },
    }
})