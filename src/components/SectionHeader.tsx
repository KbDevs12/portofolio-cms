import { Html } from "@elysiajs/html";
interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  href?: string;
  linkText?: string;
}

export const SectionHeader = ({
  eyebrow,
  title,
  href,
  linkText = "Lihat semua",
}: SectionHeaderProps) => (
  <div class="mb-5 flex items-end justify-between">
    <div>
      <p class="text-[10px] font-medium uppercase tracking-widest text-white/30">
        {eyebrow}
      </p>

      <h2 class="mt-1 text-lg font-medium">{title}</h2>
    </div>

    {href && (
      <a href={href} class="text-xs text-white/40 transition hover:text-white">
        {linkText} →
      </a>
    )}
  </div>
);
