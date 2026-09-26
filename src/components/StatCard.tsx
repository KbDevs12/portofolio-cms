import { Html } from "@elysiajs/html";
interface StatCardProps {
  label: string;
  value: string | number;
  description: string;
  href?: string;
}

export const StatCard = ({
  label,
  value,
  description,
  href,
}: StatCardProps) => {
  const content = (
    <>
      <div class="flex items-start justify-between">
        <span class="text-xs text-white/40">{label}</span>

        {href && (
          <span class="text-white/20 transition group-hover:text-white">→</span>
        )}
      </div>

      <div class="mt-7">
        <p class="text-3xl font-semibold tracking-tight">{value}</p>

        <p class="mt-1 text-sm text-white/40">{description}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        class="group bg-[#0d0d0d] p-6 transition hover:bg-[#111111]"
      >
        {content}
      </a>
    );
  }

  return <div class="bg-[#0d0d0d] p-6">{content}</div>;
};
