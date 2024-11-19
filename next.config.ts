import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["o9ybdhbfta3tzvhp.public.blob.vercel-storage.com"],
  },
};
 
export default withNextIntl(nextConfig);