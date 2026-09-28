function dayFormat(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDate(iso: string): string {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateV2(date: string | null): string {
  const formatted = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date as string));

  return formatted;
}

export { dayFormat, formatDate, formatDateV2 };

export default { dayFormat };
