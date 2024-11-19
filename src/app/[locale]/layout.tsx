import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from "@/components/smooth-scroll";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Julian Maggio | Web Developer",
    template: "%s | Julian Maggio",
  },
  description:
    "Hey, I'm Julian. I build cool stuff on the web. Check out my projects!",
  keywords: [
    "Julian Maggio",
    "Web Developer",
    "React",
    "Next.js",
    "JavaScript",
    "Portfolio",
  ],
  authors: [{ name: "Julian Maggio" }],
  creator: "Julian Maggio",
  metadataBase: new URL("https://www.julianmaggio.me"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.julianmaggio.me",
    siteName: "Julian Maggio",
    title: "Julian Maggio | Web Developer",
    description:
      "Web developer crafting digital experiences. Come see what I've been working on!",
    images: [{ url: "/api/og" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Julian Maggio | Web Developer",
    description: "Check out my latest web projects and experiments!",
    images: ["/api/og"],
    creator: "@julianmaggio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure the incoming locale is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Fetch messages for the locale
  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Julian" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} select-none`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll>
            <NextIntlClientProvider messages={messages}>
              <Navbar />
              <PageTransition>
                <main className="min-h-screen pt-8 pb-8">{children}</main>
              </PageTransition>
              <Footer />
              <Toaster />
            </NextIntlClientProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
