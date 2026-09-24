import React, { useState } from 'react';
import { Field } from '@/shared/ui';
import { Camera, Loader2 } from 'lucide-react';
import { useUpload } from '@/features/authentication/application/mutations/use-upload.mutation';

export interface AuthLogoWidgetProps {
  id: string;
  value?: string;
  onChange: (value: string) => void;
  errors?: unknown[];
  className?: string;
}

export function AuthLogoWidget({
  id,
  value,
  onChange,
  errors,
  className,
}: AuthLogoWidgetProps) {
  const [preview, setPreview] = useState<string | undefined>(value);
  const upload = useUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately for snappy UX
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    // Generate a unique object path: logos/<timestamp>-<filename>
    const objectPath = `logos/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    const publicUrl = await upload.mutateAsync({ file, objectPath });

    // Revoke the local blob URL now we have the real one
    URL.revokeObjectURL(localPreview);
    setPreview(publicUrl);
    onChange(publicUrl);
  };

  return (
    <Field className={className}>
      <label htmlFor={`${id}-upload`} className="cursor-pointer group block" title="Upload Logo">
        <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted/50 group-hover:bg-muted transition-colors">
          {upload.isPending ? (
            <Loader2 className="size-5 text-muted-foreground animate-spin" />
          ) : preview ? (
            <img src={preview} alt="Logo preview" className="size-full object-cover" />
          ) : (
            <Camera className="size-5 text-muted-foreground" />
          )}
        </div>
      </label>
      <input
        id={`${id}-upload`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={upload.isPending}
      />
      {upload.isError && (
        <p className="text-[0.8rem] font-medium text-destructive mt-1">
          Upload failed. Please try again.
        </p>
      )}
      {errors && errors.length > 0 ? (
        <p className="text-[0.8rem] font-medium text-destructive mt-1">
          {errors
            .map((err) => {
              if (typeof err === 'string') return err;
              if (err && typeof err === 'object' && 'message' in err) {
                return String((err as { message: unknown }).message);
              }
              return JSON.stringify(err);
            })
            .join(', ')}
        </p>
      ) : null}
    </Field>
  );
}
