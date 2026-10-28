import type { VerifyEmailRequest } from "@/shared/api/generated"
import { queryClient } from "@/shared/api"
import { useMutation } from "@tanstack/react-query"
import { authRepository } from "../../infrastructure"

export function useVerifyEmail() {
  return useMutation(
    {
      mutationFn: (payload: VerifyEmailRequest) => authRepository.verifyEmail(payload),
    },
    queryClient,
  )
}
