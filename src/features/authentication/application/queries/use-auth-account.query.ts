import { createQueryKeyFactory, queryClient } from "@/shared/api"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { authRepository } from "../../infrastructure"
import type { AuthAccount } from "@/domains/auth"

export const authQueryKeys = createQueryKeyFactory("auth")

export function useAuthAccount(
  options?: Omit<UseQueryOptions<AuthAccount, Error>, "queryKey" | "queryFn">
) {
  return useQuery(
    {
      // Use the details key for the auth account singleton
      ...options,
      queryKey: authQueryKeys.details(),
      queryFn: () => authRepository.getAuthAccount(),
    },
    queryClient
  )
}
