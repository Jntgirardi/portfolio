import localFont from "next/font/local";

/**
 * Sistema tipográfico contemporâneo e clean (2026):
 * - Space Grotesk Variable (display geométrica moderna e precisa para títulos)
 * - Plus Jakarta Sans Variable (interface, navegação, botões e leitura fluida)
 * - Fraunces Variable (serifa itálica editorial para destaques pontuais)
 * - JetBrains Mono Variable (detalhes técnicos sutis e métricas)
 */

export const fontDisplay = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-ext-wght-normal.woff2",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-display-var",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const fontSans = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-ext-wght-normal.woff2",
      weight: "200 800",
      style: "normal",
    },
  ],
  variable: "--font-sans-var",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

export const fontSerif = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-opsz-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
    {
      path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-serif-var",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const fontMono = localFont({
  src: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-mono-var",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
