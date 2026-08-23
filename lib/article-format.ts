/** UTC-pinned so the server and client render the same string. */
const FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
})

export function formatArticleDate(date: string): string {
  return FORMATTER.format(new Date(date))
}
