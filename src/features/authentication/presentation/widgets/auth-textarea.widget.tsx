import { Field, FieldLabel } from '@/shared/ui';

export interface AuthTextareaWidgetProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  errors?: unknown[];
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function AuthTextareaWidget({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  errors,
  disabled,
  required,
  className,
}: AuthTextareaWidgetProps) {
  return (
    <Field className={className}>
      <FieldLabel htmlFor={id}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </FieldLabel>
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        className="flex min-h-20 w-full min-w-0 rounded-3xl border border-transparent bg-input/50 px-3 py-2 text-base transition-[color,box-shadow,background-color] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 resize-none"
      />
      {errors && errors.length > 0 ? (
        <p className="text-[0.8rem] font-medium text-destructive">
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
