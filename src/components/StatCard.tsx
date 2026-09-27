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
      <p class="font-mono text-4xl font-medium tracking-tight text-paper">
        {value}
      </p>

      <p class="mt-2 text-sm text-paper/60">{description}</p>

      <p class="mt-0.5 text-[11px] text-paper/30">{label}</p>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        class="flex flex-1 flex-col px-6 py-6 transition hover:bg-paper/5"
      >
        {content}
      </a>
    );
  }

  return <div class="flex flex-1 flex-col px-6 py-6">{content}</div>;
};
