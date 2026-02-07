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

function formatDateShort(isoDate) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(`${isoDate}T12:00:00`));
}

function formatDateMonthDay(isoDate) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short"
  }).format(new Date(`${isoDate}T12:00:00`));
}

export function formatRangeCompact(start, end) {
  if (start === end) return formatDateShort(start);

  const startDate = new Date(`${start}T12:00:00`);
  const endDate = new Date(`${end}T12:00:00`);
  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const sameMonth = sameYear && startDate.getMonth() === endDate.getMonth();

  if (sameMonth) {
    const monthYear = new Intl.DateTimeFormat("es-AR", { month: "short", year: "numeric" }).format(startDate);
    return `${String(startDate.getDate()).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")} ${monthYear}`;
  }

  if (sameYear) {
    const startPart = formatDateMonthDay(start);
    const endPart = formatDateMonthDay(end);
    return `${startPart}-${endPart} ${startDate.getFullYear()}`;
  }

  return `${formatDateShort(start)}-${formatDateShort(end)}`;
}
