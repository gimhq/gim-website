/**
 * Runs before first paint on the unprefixed (English) pages: a visitor whose
 * browser prefers Chinese, or who picked Chinese before, is sent to the /zh/
 * page. An explicit English pick stays put.
 *
 * It is serialised into an inline script with `toString()`, so it must not
 * reference anything outside its own body.
 */
export function zhRedirectTarget(
  pathname: string,
  stored: string | null,
  languages: readonly string[],
): string | null {
  if (stored === 'en')
    return null
  const wantsZh = stored === 'zh' || /^zh(?:-|$)/i.test(languages[0] ?? '')
  if (!wantsZh || /^\/zh(?:\/|$)/.test(pathname))
    return null
  return `/zh${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}
