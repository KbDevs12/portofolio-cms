import { Html } from "@elysiajs/html";
interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span class="inline-flex items-center gap-1.5 text-xs text-white/50">
    <span class="h-1.5 w-1.5 rounded-full bg-white/40" />
    {status}
  </span>
);
