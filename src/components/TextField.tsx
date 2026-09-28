import { Html } from "@elysiajs/html";

export const fieldClass =
  "w-full rounded-lg border border-paper/15 bg-panel px-3 py-2 font-serif text-paper placeholder:text-paper/30 transition-colors hover:border-accent/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

type TextFieldProps = {
  name: string;
  label: string;
  value?: string | null;
  type?: "text" | "email" | "url";
  placeholder?: string;
  hint?: string;
  required?: boolean;
  recommended?: number;
};

export const TextField = ({
  name,
  label,
  value,
  type = "text",
  placeholder,
  hint,
  required = false,
  recommended,
}: TextFieldProps) => {
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

      <input
        id={name}
        name={name}
        type={type}
        value={current}
        placeholder={placeholder}
        required={required}
        data-recommended={recommended}
        class={fieldClass}
      />

      {hint && <p class="font-serif text-xs italic text-paper/40">{hint}</p>}
    </div>
  );
};
