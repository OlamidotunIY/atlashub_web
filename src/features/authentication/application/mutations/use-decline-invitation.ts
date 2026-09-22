import { useMutation } from "@tanstack/react-query";
import { invitationApi } from "../../infrastructure";
import { queryClient } from "@/shared/api";
import { invitationQueryKeys } from "../queries";

export function useDeclineInvitation() {
  return useMutation({
    mutationFn: (token: string) => invitationApi.declineInvitation(token),
    onSuccess: (_, token) => {
      queryClient.invalidateQueries({ queryKey: invitationQueryKeys.detail(token) });
    }
  }, queryClient);
}