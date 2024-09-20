/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["o9ybdhbfta3tzvhp.public.blob.vercel-storage.com"],
  },
    i18n: {
    locales: ["en", "da", "de"],
    defaultLocale: "en",
  },
};

export default nextConfig;