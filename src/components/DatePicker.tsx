import { Html } from "@elysiajs/html";

type DatePickerProps = {
  name: string;
  value?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
};

export const DatePicker = ({
  name,
  value = "",
  placeholder = "Pilih tanggal",
  label,
  required = false,
  disabled = false,
}: DatePickerProps) => (
  <div class="flex flex-col gap-1.5">
    {label && <label class="font-mono text-sm text-paper/70">{label}</label>}

    <div
      class={`relative inline-block w-full ${
        disabled ? "pointer-events-none opacity-50" : ""
      }`}
      data-datepicker
    >
      <input
        type="hidden"
        name={name}
        value={disabled ? "" : value}
        required={required && !disabled}
        disabled={disabled}
        data-dp-value
      />

      <button
        type="button"
        disabled={disabled}
        class="flex w-full items-center justify-between gap-2 rounded-lg border border-paper/15 bg-panel px-3 py-2 text-left font-serif text-paper transition-colors hover:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:hover:border-paper/15"
        data-dp-trigger
      >
        <span
          class={`min-w-0 flex-1 truncate ${
            value && !disabled ? "text-paper" : "text-paper/40"
          }`}
          data-dp-display
        >
          {disabled ? placeholder : value || placeholder}
        </span>

        <svg
          class="h-4 w-4 shrink-0 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      </button>

      <div
        class="absolute z-50 mt-2 hidden w-64 rounded-lg border border-paper/15 bg-panel p-3 shadow-lg shadow-black/40"
        data-dp-panel
      >
        <div class="mb-2 flex items-center justify-between">
          <button
            type="button"
            class="rounded-md p-1 text-paper/70 hover:bg-accent/15 hover:text-accent"
            data-dp-prev
            aria-label="Bulan sebelumnya"
          >
            ‹
          </button>
          <span class="font-mono text-sm text-paper" data-dp-month-label></span>
          <button
            type="button"
            class="rounded-md p-1 text-paper/70 hover:bg-accent/15 hover:text-accent"
            data-dp-next
            aria-label="Bulan berikutnya"
          >
            ›
          </button>
        </div>

        <div class="mb-1 grid grid-cols-7 text-center font-mono text-[11px] text-paper/40">
          <span>Min</span>
          <span>Sen</span>
          <span>Sel</span>
          <span>Rab</span>
          <span>Kam</span>
          <span>Jum</span>
          <span>Sab</span>
        </div>

        <div class="grid grid-cols-7 gap-1" data-dp-days></div>
      </div>
    </div>
  </div>
);
