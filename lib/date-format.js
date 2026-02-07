export function formatDate(isoDate) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(`${isoDate}T12:00:00`));
}

export function formatRange(start, end) {
  if (start === end) return formatDate(start);
  return `${formatDate(start)} al ${formatDate(end)}`;
}
