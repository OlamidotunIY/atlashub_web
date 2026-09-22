import { useQuery } from '@tanstack/react-query';
import { invitationApi } from '../../infrastructure';
import { createQueryKeyFactory, queryClient } from '@/shared/api';

export const invitationQueryKeys = createQueryKeyFactory('invitations');

export function useInvitation(token: string, enabled = true) {
  return useQuery(
    {
      queryKey: invitationQueryKeys.detail(token),
      queryFn: () => invitationApi.getInvitation(token),
      enabled: !!token && enabled,
    },
    queryClient
  );
}
