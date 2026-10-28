import { queryClient } from "@/shared/api"
import { useMutation } from "@tanstack/react-query"
import { authRepository } from "../../infrastructure"

export function useResendVerification() {
  return useMutation(
    {
      mutationFn: (email: string) => authRepository.resendVerification(email),
    },
    queryClient,
  )
}
