import { getGlobalApiClient } from '@/shared/api';
import type { ApiResponse } from '@/shared';
import type { SignedUrlRequest, SignedUrlResponse } from '@/shared/api/generated';

const getApi = () => getGlobalApiClient();

export const storageApi = {
  getSignedUrl: (req: SignedUrlRequest): Promise<SignedUrlResponse> =>
    getApi()
      .get<ApiResponse<SignedUrlResponse>>('/api/v1/storage/signed-url', {
        params: req,
      })
      .then((r) => r.data.data),

  uploadToGcs: (signedUrl: string, file: File): Promise<void> =>
    getApi()
      .put(signedUrl, file, {
        headers: { 'Content-Type': file.type },
        // Do not send auth token — GCS signed URL is self-authorising
        transformRequest: [(data) => data],
      })
      .then(() => undefined),
};
