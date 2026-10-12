import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/motion-provider";
import { profile } from "@/content/profile";
import { fontDisplay, fontMono, fontSans, fontSerif } from "@/lib/fonts";
import { isPlaceholder, siteUrl } from "@/lib/site";
import "./globals.css";

const title = isPlaceholder(profile.role)
  ? profile.name
  : `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description: profile.seoDescription,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.seoDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${fontDisplay.variable} ${fontSerif.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="grain min-h-dvh antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-sans focus:text-xs focus:font-semibold focus:text-accent-ink"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
