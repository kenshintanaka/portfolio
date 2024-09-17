/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["o9ybdhbfta3tzvhp.public.blob.vercel-storage.com"],
  },
  experimental: {
    runtime: "experimental-edge",
  },
};

export default nextConfig;
