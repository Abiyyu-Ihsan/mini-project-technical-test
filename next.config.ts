/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    SECRET_KEY: process.env.SECRET_KEY,
  },
  images: {
    domains: ["asset-ksu.aether.id", "/icons/*"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: false
};

module.exports = nextConfig;
