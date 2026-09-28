import { Html } from "@elysiajs/html";
import { fieldClass } from "./TextField";

type TextAreaProps = {
  name: string;
  label: string;
  value?: string | null;
  rows?: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  recommended?: number;
};

export const TextArea = ({
  name,
  label,
  value,
  rows = "4",
  placeholder,
  hint,
  required = false,
  recommended,
}: TextAreaProps) => {
  const current = value ?? "";

  return (
    <div class="flex flex-col gap-1.5">
      <div class="flex items-baseline justify-between gap-2">
        <label for={name} class="font-mono text-sm text-paper/70">
          {label}
          {required && <span class="ml-1 text-accent">*</span>}
        </label>

        {recommended && (
          <span
            class="font-mono text-xs text-paper/40 data-[over=true]:text-accent"
            data-counter-for={name}
            data-over={String(current.length > recommended)}
          >
            {current.length} / {recommended}
          </span>
        )}
      </div>

      <textarea
        safe
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        data-recommended={recommended}
        class={`${fieldClass} resize-y`}
      >
        {current}
      </textarea>

      {hint && <p class="font-serif text-xs italic text-paper/40">{hint}</p>}
    </div>
  );
};
