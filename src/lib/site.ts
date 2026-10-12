/** URL canônica do site. Defina NEXT_PUBLIC_SITE_URL em produção. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/** Marcadores de conteúdo pendente, no formato "[PREENCHER: ...]". */
export const PLACEHOLDER_PATTERN = /\[PREENCHER[^\]]*\]/;

export function isPlaceholder(value: string | undefined | null): boolean {
  return !!value && PLACEHOLDER_PATTERN.test(value);
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
