export default function dayFormat(date: Date) {
  const formatted = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formatted;
}
