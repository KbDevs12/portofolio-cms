import { Html } from "@elysiajs/html";
interface SectionHeaderProps {
  title: string;
  href?: string;
  linkText?: string;
}

export const SectionHeader = ({
  title,
  href,
  linkText = "Lihat semua",
}: SectionHeaderProps) => (
  <div class="mb-5 flex items-end justify-between border-b border-paper/10 pb-3">
    <h2 class="font-mono text-sm text-paper/70">{title}</h2>

    {href && (
      <a
        href={href}
        class="flex items-center gap-1 text-xs text-paper/40 transition hover:text-accent"
      >
        {linkText}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          class="h-3 w-3"
        >
          <path
            d="M9 6l6 6-6 6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    )}
  </div>
);
