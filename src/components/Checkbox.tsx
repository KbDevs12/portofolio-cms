import { Html } from "@elysiajs/html";

type CheckboxProps = {
  name: string;
  value?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
};

export const Checkbox = ({
  name,
  value = "on",
  label,
  checked = false,
  disabled = false,
  id,
}: CheckboxProps) => {
  const inputId = id || name;

  return (
    <label
      for={inputId}
      class={`inline-flex items-center gap-2.5 select-none ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
    >
      <span class="relative flex h-5 w-5 shrink-0">
        <input
          type="checkbox"
          id={inputId}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          class="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-paper/25 bg-panel transition-colors checked:border-accent checked:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-ink disabled:cursor-not-allowed"
        />
        <svg
          class="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 text-ink opacity-0 transition-opacity peer-checked:opacity-100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>

      {label && <span class="font-serif text-sm text-paper">{label}</span>}
    </label>
  );
};
