export function formatReadableDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
