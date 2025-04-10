export function formatDateRange(startDate: string, endDate?: string): string {
  const start = new Date(startDate)
  const startFormatted = start.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })

  if (!endDate) {
    return `${startFormatted} - Present`
  }

  const end = new Date(endDate)
  const endFormatted = end.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })

  return `${startFormatted} - ${endFormatted}`
}
