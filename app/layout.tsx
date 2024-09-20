import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import LoadingScreen from "@/components/loading-screen";
import PageTransition from "@/components/page-transition";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from "@/components/smooth-scroll";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} select-none`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll>
            <LoadingScreen />
            <Navbar />
            <PageTransition>
              <main className="min-h-screen pt-8 pb-8">{children}</main>
            </PageTransition>
            <Footer />
            <Toaster />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
