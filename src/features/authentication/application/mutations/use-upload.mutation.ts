import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/api';
import { storageApi } from '@/shared/api';

interface UploadFileOptions {
  file: File;
  /** Destination path in the bucket e.g. "logos/my-company.png" */
  objectPath: string;
}

export function useUpload() {
  return useMutation(
    {
      mutationFn: async ({ file, objectPath }: UploadFileOptions): Promise<string> => {
        // 1. Ask your backend for a short-lived signed URL
        const { signedUrl, objectPath: confirmedPath } = await storageApi.getSignedUrl({
          objectPath,
          contentType: file.type,
          ttlMinutes: 10,
        });

        if (!signedUrl || !confirmedPath) {
          throw new Error('Failed to get a valid signed URL from the server.');
        }

        // 2. Upload the file directly to GCS using the signed URL
        await storageApi.uploadToGcs(signedUrl, file);

        // 3. Derive the public GCS URL from the object path
        // GCS public URL pattern: https://storage.googleapis.com/<bucket>/<objectPath>
        // The backend signs a URL that already encodes the bucket — we can parse it out.
        const url = new URL(signedUrl);
        // The pathname looks like: /<bucket>/<objectPath>
        const bucket = url.pathname.split('/')[1];
        return `https://storage.googleapis.com/${bucket}/${confirmedPath}`;
      },
    },
    queryClient,
  );
}
