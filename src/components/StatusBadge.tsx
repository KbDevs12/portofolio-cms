import { Html } from "@elysiajs/html";
interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const done = status.toLowerCase() === "selesai";

  return (
    <span class="inline-flex items-center gap-1.5 font-mono text-xs text-paper/55">
      <span
        class={`h-1.5 w-1.5 rounded-full ${done ? "bg-accent" : "bg-paper/30"}`}
      />
      {status}
    </span>
  );
};
