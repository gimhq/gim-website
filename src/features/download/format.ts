export function formatSize(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export function formatDate(iso: string, htmlLang: string): string {
  return new Intl.DateTimeFormat(htmlLang, { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(iso))
}
