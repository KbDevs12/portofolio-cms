import { Html } from "@elysiajs/html";

interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  selesai: "bg-accent",
  "dalam proses": "bg-paper/30",
  "saat ini": "bg-green-400",
  pemeliharaan: "bg-accent/40",
  // dibatalkan: "bg-red-400",
  // gagal: "bg-red-400",
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const dotClass = statusStyles[status.toLowerCase()] ?? "bg-paper/30";

  return (
    <span class="inline-flex items-center gap-1.5 font-mono text-xs text-paper/55">
      <span class={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      {status}
    </span>
  );
};
