import { queryClient } from "@/shared/api"
import { useMutation } from "@tanstack/react-query"
import { authRepository } from "../../infrastructure"

export function useLogout() {
  return useMutation(
    {
      mutationFn: () => authRepository.logout(),
    },
    queryClient,
  )
}
